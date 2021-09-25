import {
  ComponentParamMarkup,
  RestApiService,
  ImagesRequest,
  SchemaFigma,
} from '../../core';
import { catchError, concatMap } from 'rxjs/operators';
import { createComponent } from './figma.common';

const fetch = require('node-fetch');
const fs = require('fs');

let devToken =
  process.env.DEV_TOKEN || '203090-63cd909a-5ce6-4370-8b53-e19f27becaa8';

// if (process.argv.length < 3) {
//   console.log('Usage: node setup.js <file-key> [figma-dev-token]');
//   process.exit(0);
// }

// if (process.argv.length > 3) {
//   devToken = process.argv[3];
// }

const vectorMap = {};
const vectorList = [];
const vectorTypes = ['VECTOR', 'LINE', 'REGULAR_POLYGON', 'ELLIPSE', 'STAR'];

function preprocessTree(node) {
  let vectorsOnly = node.name.charAt(0) !== '#';
  let vectorVConstraint = null;
  let vectorHConstraint = null;

  function paintsRequireRender(paints) {
    if (!paints) return false;

    let numPaints = 0;
    for (const paint of paints) {
      if (paint.visible === false) continue;

      numPaints++;
      if (paint.type === 'EMOJI') return true;
    }

    return numPaints > 1;
  }

  if (
    paintsRequireRender(node.fills) ||
    paintsRequireRender(node.strokes) ||
    (node.blendMode != null &&
      ['PASS_THROUGH', 'NORMAL'].indexOf(node.blendMode) < 0)
  ) {
    console.log('Set vector from[blendMode]: ', node.type);
    node.type = 'VECTOR';
  }

  const children =
    node.children && node.children.filter((child) => child.visible !== false);
  if (children) {
    for (let j = 0; j < children.length; j++) {
      if (vectorTypes.indexOf(children[j].type) < 0) vectorsOnly = false;
      else {
        if (
          vectorVConstraint != null &&
          children[j].constraints.vertical != vectorVConstraint
        )
          vectorsOnly = false;
        if (
          vectorHConstraint != null &&
          children[j].constraints.horizontal != vectorHConstraint
        )
          vectorsOnly = false;
        vectorVConstraint = children[j].constraints.vertical;
        vectorHConstraint = children[j].constraints.horizontal;
      }
    }
  }
  node.children = children;

  if (children && children.length > 0 && vectorsOnly) {
    console.log('Set vector from[children]: ', node.type);
    node.type = 'VECTOR';
    node.constraints = {
      vertical: vectorVConstraint,
      horizontal: vectorHConstraint,
    };
  }

  if (vectorTypes.indexOf(node.type) >= 0) {
    console.log('Set vector from[vectorTypes]: ', node.type);
    node.type = 'VECTOR';
    vectorMap[node.id] = node;
    vectorList.push(node.id);
    node.children = [];
  }

  if (node.children) {
    for (const child of node.children) {
      preprocessTree(child);
    }
  }
}

function errHandler(err: any) {
  console.log(err);
  return err;
}

export async function main(result: SchemaFigma) {
  console.log('==========================================');
  let resp = result;
  let data = resp;

  const doc = data.document;
  const canvas = doc.children[0];

  for (let i = 0; i < canvas.children.length; i++) {
    const child = canvas.children[i];
    if (child.name.charAt(0) === '#' && child.visible !== false) {
      const child = canvas.children[i];
      preprocessTree(child);
    }
  }

  let guids = vectorList.join(',');
  let api = new RestApiService();

  api
    .get(ImagesRequest, guids)
    .pipe(
      concatMap(async (res) => {
        const imageJSON = res as any;
        const images = imageJSON.images || {};
        if (images) {
          let promises = [];
          let guids = [];
          for (const guid in images) {
            if (images[guid] == null) continue;
            guids.push(guid);
            promises.push(fetch(images[guid]));
          }

          let responses = await Promise.all(promises);
          promises = [];
          for (const resp of responses) {
            promises.push(resp.text());
          }

          responses = await Promise.all(promises);
          for (let i = 0; i < responses.length; i++) {
            images[guids[i]] = responses[i].replace(
              '<svg ',
              '<svg preserveAspectRatio="none" '
            );
          }
        }
        return images;
      }),
      catchError((err) => errHandler(err))
    )
    .subscribe((images: []) => {
      const componentMap = {};
      let contents = `import { NgModule } from '@angular/core';\n`;
      contents += `import { FormsModule } from '@angular/forms';\n`;
      contents += `import { CommonModule } from '@angular/common';\n`;
      let nextSection = ``;

      for (let i = 0; i < canvas.children.length; i++) {
        const child = canvas.children[i];
        if (child.name.charAt(0) === '#' && child.visible !== false) {
          const child = canvas.children[i];
          createComponent(child, images, componentMap);
        }
      }

      const imported = {};
      const components = [];
      for (const key in componentMap) {
        const component = componentMap[key];
        const name = component.name;
        if (!imported[name]) {
          contents += `import { ${name}Component } from './${name}.component';\n`;
          components.push(name + 'Component');
        }
        imported[name] = true;
      }
      contents += '\n';
      contents += nextSection;
      nextSection = '';

      nextSection += '@NgModule({\n';
      (nextSection += '  imports: [ CommonModule, FormsModule ],\n'),
        (nextSection += `  declarations: [ ${components.join(', ')} ],\n`);
      nextSection += `  exports: [ ${components.join(', ')} ],\n`;
      nextSection += `})\n`;
      nextSection += `export class FigmaModule { }`;

      contents += nextSection;

      const path = './src/components/figma.module.ts';
      fs.writeFile(path, contents, function (err) {
        if (err) console.log(err);
        console.log(`wrote ${path}`);
      });
    });
}
