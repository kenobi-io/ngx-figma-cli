import { switchMap, catchError } from 'rxjs/operators';
import * as fs from "fs";

import {
  LayoutStyle,
  Style,
  BackgroundStyle,
  EffectStyle,
  EffectSetStyle,
  StrokeStyle,
  BackgroundSetStyle,
  LayoutSetStyle,
  StrokeSetStyle,
  FontSetStyle,
  FontStyle,
  ParagraphSetMarkup,
  ParagraphMarkup,
  Markup,
  ParagraphParamMarkup,
  NodeTypes,
  DivSetMarkup,
  DivMarkup,
  DivParamMarkup,
  RestApiService,
  ImagesRequest,
  ImageRequest,
  Vectors
} from '../../core';

export class CodeGeneration {

  // private resolver: Resolver;
  private layoutStyle: LayoutSetStyle;
  private bgStyle: BackgroundSetStyle;
  private effectStyle: EffectSetStyle;
  private strokeStyle: StrokeSetStyle;
  private fontStyle: FontSetStyle;
  private phSetMarkup: ParagraphSetMarkup;
  private divSetMarkup: DivSetMarkup;
  private api: RestApiService;

  constructor() {
    const style = new Style();
    const markup = new Markup();
    this.layoutStyle = new LayoutStyle(style);
    this.bgStyle = new BackgroundStyle(style);
    this.effectStyle = new EffectStyle(style);
    this.strokeStyle = new StrokeStyle(style);
    this.fontStyle = new FontStyle(style);
    this.phSetMarkup = new ParagraphMarkup(markup);
    this.divSetMarkup = new DivMarkup(markup);
    this.api = new RestApiService();
  }

  public async generate(result: any) { // result files request
    const vectorList: any[] = [];
    const vectorMap = {};
    let responses;
    let data = result;

    const doc = data.document;
    const canvas = doc.children[0];
    let html = '';

    for (let i = 0; i < canvas.children.length; i++) {
      const child = canvas.children[i];

      if (child.name.charAt(0) === '#' && child.visible !== false) {
        const child = canvas.children[i];
        this.preprocessTree(child, vectorList, vectorMap);
      }
    }

    let guids = vectorList.join(',');
    let promises: unknown[] = [];
    let images;

    this.api.get(ImagesRequest, guids)
      .pipe(
        switchMap((res) => {
          data = res;
          const imageJSON = data.json();
          const images = imageJSON.images || {};

          if (images) {
            let guids = [];

            for (const guid in images) {

              if (images[guid] == null) {
                continue;
              }
              guids.push(guid);
              this.api.get(ImageRequest, images[guid]).subscribe((res) => promises.push(res));
            }
            responses = promises;
            promises = [];

            for (const resp of responses) {
              promises.push((resp as any).text());
            }

            responses = promises;

            for (let i = 0; i < responses.length; i++) {
              images[guids[i]] = (responses[i] as any).replace('<svg ', '<svg preserveAspectRatio="none" ');
            }
          }
        }),
        catchError((err) => this.errHandler(err))
      );


    const componentMap: any = {};
    let contents = `import { NgModule } from '@angular/core';\n`;
    contents += `import { FormsModule } from '@angular/forms';\n`;
    contents += `import { CommonModule } from '@angular/common';\n`;
    let nextSection = ``;

    for (let i = 0; i < canvas.children.length; i++) {
      const child = canvas.children[i];

      if (child.name.charAt(0) === '#' && child.visible !== false) {
        const child = canvas.children[i];
        this.createComponent(child, images, componentMap);
      }
    }

    const imported: any = {};
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
    contents += "\n";
    contents += nextSection;
    nextSection = '';
    nextSection += '@NgModule({\n';
    nextSection += '  imports: [ CommonModule, FormsModule ],\n',
      nextSection += `  declarations: [ ${components.join(', ')} ],\n`
    nextSection += `  exports: [ ${components.join(', ')} ],\n`
    nextSection += `})\n`;
    nextSection += `export class FigmaModule { }`;
    contents += nextSection;

    const path = "./src/components/figma.module.ts";
    fs.writeFile(path, contents, (err: any) => {

      if (err) {
        console.log(err);
      }
      console.log(`wrote ${path}`);
    });

  }

  private errHandler(err: any) {
    console.log(err);
    return err;
  }

  private preprocessTree(node: {
    name: string;
    fills: any;
    strokes: any;
    blendMode: string | null;
    type: any;
    children: any[];
    constraints: {
      vertical: any;
      horizontal: any;
    };
    id: string | number;
  }, vectorList: any[], vectorMap: any) {
    let vectorsOnly = node.name.charAt(0) !== '#';
    let vectorVConstraint = null;
    let vectorHConstraint = null;

    if (this.paintsRequireRender(node.fills)
      || this.paintsRequireRender(node.strokes)
      || (node.blendMode != null
        && ['PASS_THROUGH', 'NORMAL'].indexOf(node.blendMode) < 0)) {
      node.type = 'VECTOR';
    }
    const children = node.children && node.children.filter((child) => child.visible !== false);

    if (children) {

      for (let j = 0; j < children.length; j++) {

        if (Object.values(Vectors).includes(children[j].type)) {
          vectorsOnly = false;
        }
        else {
          if (vectorVConstraint != null
            && children[j].constraints.vertical != vectorVConstraint) {
            vectorsOnly = false;
          }
          if (vectorHConstraint != null
            && children[j].constraints.horizontal != vectorHConstraint) {
            vectorsOnly = false;
          }
          vectorVConstraint = children[j].constraints.vertical;
          vectorHConstraint = children[j].constraints.horizontal;
        }
      }
    }
    node.children = children;

    if (children && children.length > 0 && vectorsOnly) {
      node.type = 'VECTOR';
      node.constraints = {
        vertical: vectorVConstraint,
        horizontal: vectorHConstraint,
      };
    }

    if (Object.values(Vectors).includes(node.type)) {
      node.type = 'VECTOR';
      vectorMap[node.id] = node;
      vectorList.push(node.id);
      node.children = [];
    }

    if (node.children) {
      for (const child of node.children) {
        this.preprocessTree(child, vectorList, vectorMap);
      }
    }
  }

  private paintsRequireRender(paints: any) {
    if (!paints) { return false; }

    let numPaints = 0;
    for (const paint of paints) {
      if (paint.visible === false) { continue; }

      numPaints++;
      if (paint.type === 'EMOJI') { return true; }
    }

    return numPaints > 1;
  }

  private createComponent(component: any, imgMap?: any, componentMap?: any) {
    const name = 'C' + component.name.replace(/\W+/g, '');
    const instance = name + component.id.replace(';', 'S').replace(':', 'D');
    let doc = '';
    const path = `src/components/${name}.component.ts`;

    if (!fs.existsSync(path)) {
      const componentSrc = `
          import { Component, Input } from '@angular/core';
          import { NodeTypes } from '../../core/api/figma/properties/enums.property-figma';
          import { DivParamMarkup } from '../../core/markup/div/div-param-markup';
          import { take } from 'rxjs/operators';

            @Component({
              selector: 'app-${name}',
              templateUrl: '${name}.component.html',
            })
            export class ${name}Component  {
              @Input() props: any;
            }
            `;
      fs.writeFile(path, componentSrc, function (err: any) {
        if (err) console.log(err);
        console.log(`wrote ${path}`);
      });
    }


    this.visitNode(component, null, null, '  ');

    const htmPath = `src/components/${name}.component.html`;
    fs.writeFile(htmPath, doc, function (err: any) {
      if (err) console.log(err);
      console.log(`wrote ${htmPath}`);
    });
    componentMap[component.id] = { instance, name, doc };
  }

  private visitNode(node: { absoluteBoundingBox: any, children: [] },
    parent: Window | null | any,
    lastVertical: number | null,
    indent?: any) {

    let minChildren: any[] = [];
    const maxChildren: any[] = [];
    const centerChildren: any[] = [];
    let bounds = null;
    let nodeBounds = null;

    if (parent != null) {
      nodeBounds = node.absoluteBoundingBox;
      const nx2 = nodeBounds.x + nodeBounds.width;
      const ny2 = nodeBounds.y + nodeBounds.height;
      const parentBounds = parent.absoluteBoundingBox;
      const px = parentBounds.x;
      const py = parentBounds.y;

      bounds = {
        left: nodeBounds.x - px,
        right: px + parentBounds.width - nx2,
        top: lastVertical == null ? nodeBounds.y - py : nodeBounds.y - lastVertical,
        bottom: py + parentBounds.height - ny2,
        width: nodeBounds.width,
        height: nodeBounds.height,
      }
    }

    this.expandChildren(node, parent, minChildren, maxChildren, centerChildren, 0);

    const phPMp = {} as ParagraphParamMarkup;
    phPMp.fontSetStyle = this.fontStyle;
    const div = {} as DivParamMarkup;

    if (node.order) {
      mockResult.bgParam.outerStyle.zIndex = node.order;
    }
    const cHorizontal = node.constraints && node.constraints.horizontal;
    const cVertical = node.constraints && node.constraints.vertical;
    mockResult.bgParam.isVertical = false;
    this.layoutStyle.set(cHorizontal, mockResult.bgParam)
    mockResult.bgParam.isVertical = true;
    this.layoutStyle.set(cVertical, mockResult.bgParam);

    this.bgStyle.set(node.type, { value: node });
    for (let effect of node.effects) {
      this.effectStyle.set(effect.type, { value: effect });
    }
    this.strokeStyle.set(node.type, { value: node });
    this.fontStyle.set(node.type, { value: node.style });
    this.phSetMarkup.set(node.type, phPMp);
    this.divSetMarkup.set(node.type, div);
  }

  private expandChildren(node: any,
    parent: null,
    minChildren: any[],
    maxChildren: any[],
    centerChildren: any[],
    offset: number) {
    const children = node.children;
    let added = offset;

    if (children) {
      for (let i = 0; i < children.length; i++) {
        const child = children[i];

        if (parent != null
          && (node.type === 'COMPONENT'
            || node.type === 'INSTANCE')) {
          child.constraints = {
            vertical: 'TOP_BOTTOM',
            horizontal: 'LEFT_RIGHT'
          };
        }

        if (NodeTypes.GROUP === child.type
          || NodeTypes.BOOLEAN_OPERATION === child.type) {
          added += this.expandChildren(child,
            parent,
            minChildren,
            maxChildren,
            centerChildren,
            added + i);
          continue;
        }

        child.order = i + added;

        if (child.constraints
          && child.constraints.vertical === 'BOTTOM') {
          maxChildren.push(child);
        } else if (child.constraints
          && child.constraints.vertical === 'TOP') {
          minChildren.push(child);
        } else {
          centerChildren.push(child);
        }
      }

      minChildren.sort(this.nodeSort);
      maxChildren.sort(this.nodeSort);

      return added + children.length - offset;
    }

    return added - offset;
  }

  private nodeSort(a: any, b: any): number {
    if (a.absoluteBoundingBox.y < b.absoluteBoundingBox.y) {
      return -1;
    } else if (a.absoluteBoundingBox.y === b.absoluteBoundingBox.y) {
      return 0;
    } else {
      return 1;
    }
  }

}
