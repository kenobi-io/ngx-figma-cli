import {
  LayoutStyle,
  BackgroundStyle,
  EffectStyle,
  StrokeStyle,
  ParagraphMarkup,
  Markup,
  ParagraphParamMarkup,
  Nodes,
  LayoutParamStyle,
  byTextFontStyle,
  divMarkup,
  byHashMarkup,
  vectorMarkup,
  markup,
  NodeParamMarkup,
  Style,
  ItemNode,
} from '../../core';
const fs = require('fs');

const GROUP_TYPES = ['GROUP', 'BOOLEAN_OPERATION'];

export function colorString(color) {
  return `rgba(${Math.round(color.r * 255)}, ${Math.round(
    color.g * 255
  )}, ${Math.round(color.b * 255)}, ${color.a})`;
}

function nodeSort(a, b) {
  if (a.absoluteBoundingBox.y < b.absoluteBoundingBox.y) return -1;
  else if (a.absoluteBoundingBox.y === b.absoluteBoundingBox.y) return 0;
  else return 1;
}

function expandChildren(
  node,
  parent,
  minChildren,
  maxChildren,
  centerChildren,
  offset
) {
  const children = node.children;
  let added = offset;

  if (children) {
    for (let i = 0; i < children.length; i++) {
      const child = children[i];

      if (
        parent != null &&
        (node.type === 'COMPONENT' || node.type === 'INSTANCE')
      ) {
        child.constraints = {
          vertical: 'TOP_BOTTOM',
          horizontal: 'LEFT_RIGHT',
        };
      }

      if (GROUP_TYPES.indexOf(child.type) >= 0) {
        added += expandChildren(
          child,
          parent,
          minChildren,
          maxChildren,
          centerChildren,
          added + i
        );
        continue;
      }

      child.order = i + added;

      if (child.constraints && child.constraints.vertical === 'BOTTOM') {
        maxChildren.push(child);
      } else if (child.constraints && child.constraints.vertical === 'TOP') {
        minChildren.push(child);
      } else {
        centerChildren.push(child);
      }
    }

    minChildren.sort(nodeSort);
    maxChildren.sort(nodeSort);

    return added + children.length - offset;
  }

  return added - offset;
}
let markupInst = new Markup();

function createNode(node: ItemNode, parent, lastVertical, indent) {
  let content = null;
  let img = null;
  const style = new Style();
  let minChildren = [];
  const maxChildren = [];
  const centerChildren = [];
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
      top:
        lastVertical == null ? nodeBounds.y - py : nodeBounds.y - lastVertical,
      bottom: py + parentBounds.height - ny2,
      width: nodeBounds.width,
      height: nodeBounds.height,
    };
  }

  expandChildren(node, parent, minChildren, maxChildren, centerChildren, 0);

  let outerClass = 'outerDiv';
  let innerClass = 'innerDiv';
  const cHorizontal = node.constraints && node.constraints.horizontal;
  const cVertical = node.constraints && node.constraints.vertical;
  let outerStyle = {} as any;

  if (node.order) {
    outerStyle.zIndex = node.order;
  }
  const layoutStyle = new LayoutStyle(style);
  const backgroundStyle = new BackgroundStyle(style);
  const effectStyle = new EffectStyle(style);
  const strokeStyle = new StrokeStyle(style);
  const paragraphSetMarkup = new ParagraphMarkup(markupInst);

  const layoutParamStyle: LayoutParamStyle = {
    value: bounds,
    outerStyle,
    outerClass,
    isVertical: false,
  };
  const paragraphParamMarkup = {
    content: null,
    value: node,
    para: '',
    styleCache: {},
    currStyle: 0,
    ps: [],
  } as ParagraphParamMarkup;

  outerStyle = layoutParamStyle.outerStyle;
  outerClass = layoutParamStyle.outerClass;
  layoutParamStyle.isVertical = false;
  layoutStyle.invoke(cHorizontal, layoutParamStyle);
  layoutParamStyle.isVertical = true;
  layoutStyle.invoke(cVertical, layoutParamStyle);
  outerStyle = layoutParamStyle.outerStyle;
  outerClass = layoutParamStyle.outerClass;

  if (
    node.type === Nodes.FRAME ||
    node.type === Nodes.INSTANCE ||
    node.type === Nodes.COMPONENT
  ) {
    backgroundStyle.invoke(node.type, { value: node });
  } else if (node.type === Nodes.RECTANGLE) {
    const lastFill = backgroundStyle.style.lastPaint(node.fills);
    backgroundStyle.invoke(lastFill.type, { value: node });
    for (let effect of node.effects) {
      effectStyle.invoke(effect.type, { value: effect });
    }
    strokeStyle.invoke(node.type, { value: node });
  } else if (node.type === 'TEXT') {
    backgroundStyle.invoke(node.type, { value: node });
    byTextFontStyle(style, node.style);
    paragraphSetMarkup.invoke(node.type, paragraphParamMarkup);
    content = paragraphParamMarkup.content;
  }

  const property: NodeParamMarkup = {
    node,
    parent,
    content,
    style,
    outerStyle,
    outerClass,
    innerClass,
    minChildren,
    centerChildren,
    maxChildren,
    nodeName: 'div',
    indent,
  };

  if (parent != null) {
    divMarkup(markupInst, property);
  }
  if (node.id !== markupInst.component.id && node.name.charAt(0) === '#') {
    byHashMarkup(markupInst, property, divMarkup, createComponent);
  } else if (node.type === Nodes.VECTOR) {
    vectorMarkup(markupInst, property);
  } else {
    markup(markupInst, property, divMarkup, createNode);
  }

  if (parent != null) {
    markupInst.append(`  </div>`, indent);
    markupInst.append(`</div>`, indent);
  }
}

export const createComponent = (component, imgMap, componentMap) => {
  const name = 'C' + component.name.replace(/\W+/g, '');
  const instance = name + component.id.replace(';', 'S').replace(':', 'D');

  let doc = '';

  const path = `src/components/${name}.component.ts`;

  if (!fs.existsSync(path)) {
    const componentSrc = `
    import { Component, Input } from '@angular/core';
    import { style } from '@angular/animations';

    @Component({
      selector: 'app-${name}',
      templateUrl: '${name}.component.html',
    })
    export class ${name}Component  {
      @Input() props: any;
    }
    `;
    fs.writeFile(path, componentSrc, function (err) {
      if (err) console.log(err);
      console.log(`wrote ${path}`);
    });
  }

  function append(msg, indent) {
    doc += `${indent}${msg}\n`;
  }

  markupInst.component = component;
  markupInst.imgMap = imgMap;
  markupInst.componentMap = componentMap;
  markupInst.append = append;

  createNode(component, null, null, '  ');

  const htmPath = `src/components/${name}.component.html`;
  fs.writeFile(htmPath, doc, function (err) {
    if (err) console.log(err);
    console.log(`wrote ${htmPath}`);
  });
  componentMap[component.id] = {
    instance,
    name,
    doc,
  };
};
