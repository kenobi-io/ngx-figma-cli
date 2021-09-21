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
  Nodes,
  DivSetMarkup,
  DivMarkup,
  DivParamMarkup,
  RestApiService,
  ImagesRequest,
  ImageRequest,
  Vectors,
  Groups,
  LayoutConstraints,
  LayoutParamStyle,
  RectangleFigma,
} from '../../core';

const fs = require('fs');

const VECTOR_TYPES = ['VECTOR', 'LINE', 'REGULAR_POLYGON', 'ELLIPSE'];
const GROUP_TYPES = ['GROUP', 'BOOLEAN_OPERATION'];

export function colorString(color) {
  return `rgba(${Math.round(color.r * 255)}, ${Math.round(
    color.g * 255
  )}, ${Math.round(color.b * 255)}, ${color.a})`;
}

function dropShadow(effect) {
  return `${effect.offset.x}px ${effect.offset.y}px ${
    effect.radius
  }px ${colorString(effect.color)}`;
}

function innerShadow(effect) {
  return `inset ${effect.offset.x}px ${effect.offset.y}px ${
    effect.radius
  }px ${colorString(effect.color)}`;
}

function imageURL(hash) {
  const squash = hash.split('-').join('');
  return `url(https://s3-us-west-2.amazonaws.com/figma-alpha/img/${squash.substring(
    0,
    4
  )}/${squash.substring(4, 8)}/${squash.substring(8)})`;
}

function backgroundSize(scaleMode) {
  if (scaleMode === 'FILL') {
    return 'cover';
  }
}

function nodeSort(a, b) {
  if (a.absoluteBoundingBox.y < b.absoluteBoundingBox.y) return -1;
  else if (a.absoluteBoundingBox.y === b.absoluteBoundingBox.y) return 0;
  else return 1;
}

function getPaint(paintList) {
  if (paintList && paintList.length > 0) {
    return paintList[paintList.length - 1];
  }

  return null;
}

function paintToLinearGradient(paint) {
  const handles = paint.gradientHandlePositions;
  const handle0 = handles[0];
  const handle1 = handles[1];

  const ydiff = handle1.y - handle0.y;
  const xdiff = handle0.x - handle1.x;

  const angle = Math.atan2(-xdiff, -ydiff);
  const stops = paint.gradientStops
    .map((stop) => {
      return `${colorString(stop.color)} ${Math.round(stop.position * 100)}%`;
    })
    .join(', ');
  return `linear-gradient(${angle}rad, ${stops})`;
}

function paintToRadialGradient(paint) {
  const stops = paint.gradientStops
    .map((stop) => {
      return `${colorString(stop.color)} ${Math.round(stop.position * 60)}%`;
    })
    .join(', ');

  return `radial-gradient(${stops})`;
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
let markup = new Markup();
let divSetMarkup = new DivMarkup(markup);

function visitNode(node, parent, lastVertical, indent, div?: DivParamMarkup) {
  // const style = new Style();
  // const markup = new Markup();

  let content = null;
  let img = null;
  const styles = new Style(); // TODO: styles rename to style
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
  const layoutStyle = new LayoutStyle(styles);
  const backgroundStyle = new BackgroundStyle(styles);
  const effectStyle = new EffectStyle(styles);
  const strokeStyle = new StrokeStyle(styles);
  const fontStyle = new FontStyle(styles);
  const paragraphSetMarkup = new ParagraphMarkup(markup);

  const layoutParamStyle: LayoutParamStyle = {
    value: bounds,
    outerStyle,
    outerClass,
    isVertical: false,
  };
  const paragraphParamMarkup = {
    content: null,
    fontSetStyle: fontStyle,
    value: node,
    para: '',
    styleCache: {},
    currStyle: 0,
    ps: [],
  } as ParagraphParamMarkup;
  bounds = layoutParamStyle.value;
  outerStyle = layoutParamStyle.outerStyle;
  outerClass = layoutParamStyle.outerClass;
  layoutParamStyle.isVertical = false;
  layoutStyle.invoke(cHorizontal, layoutParamStyle);
  layoutParamStyle.isVertical = true;
  layoutStyle.invoke(cVertical, layoutParamStyle);
  bounds = layoutParamStyle.value;
  outerStyle = layoutParamStyle.outerStyle;
  outerClass = layoutParamStyle.outerClass;
  if (
    node.type === Nodes.FRAME ||
    node.type === Nodes.INSTANCE ||
    node.type === Nodes.COMPONENT
  ) {
    backgroundStyle.invoke(node.type, { value: node });
  } else if (node.type === Nodes.RECTANGLE) {
    const lastFill = backgroundStyle.style.lastPaint(
      (node as RectangleFigma).fills
    );
    backgroundStyle.invoke(lastFill.type, { value: node });
    for (let effect of node.effects) {
      effectStyle.invoke(effect.type, { value: effect });
    }
    strokeStyle.invoke(node.type, { value: node });
  } else if (node.type === 'TEXT') {
    backgroundStyle.invoke(node.type, { value: node });
    fontStyle.invoke(node.type, { value: node.style });
    paragraphSetMarkup.invoke(node.type, paragraphParamMarkup);
    content = paragraphParamMarkup.content;
  }
  divSetMarkup.invoke(
    node,
    parent,
    content,
    styles,
    outerStyle,
    outerClass,
    innerClass,
    minChildren,
    centerChildren,
    maxChildren,
    indent,
    div
  );
}

export const createComponent = (
  component,
  imgMap,
  componentMap,
  div?: DivParamMarkup
) => {
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

  function print(msg, indent) {
    doc += `${indent}${msg}\n`;
  }

  div.component = component;
  div.imgMap = imgMap;
  div.componentMap = componentMap;
  div.codeGen.visitNode = visitNode;
  div.codeGen.print = print;

  visitNode(component, null, null, '  ', div);

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

// module.exports = { createComponent, colorString }
