import { ItemNode, Nodes } from '../api';
import { Markup, paragraphContext, ParagraphMarkup } from '../markup';
import {
  backgroundContext,
  textFont,
  effectContext,
  LayoutStyle,
  strokeContext,
  Style,
  layoutContext,
} from '../style';
import { expandChildren } from './expand-children';
import { markupContext, NodeMarkup } from '../markup/div';
import { createComponent } from './create-component';

//TODO: add desc
export function createNode<T extends Partial<ItemNode>>(
  this: T,
  parent: T,
  lastVertical: number,
  indent: string,
  markup: Markup
): void {
  let content = null;
  // let img = null;
  const style = {} as Style;
  let minChildren = [];
  const maxChildren = [];
  const centerChildren = [];
  let bounds = null;
  let nodeBounds = null;

  if (parent != null) {
    nodeBounds = this.absoluteBoundingBox;
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

  expandChildren.call(
    this,
    parent,
    minChildren,
    maxChildren,
    centerChildren,
    0
  );

  let outerClass = 'outerDiv';
  let innerClass = 'innerDiv';
  const cHorizontal = this.constraints && this.constraints.horizontal;
  const cVertical = this.constraints && this.constraints.vertical;
  let outerStyle = {} as any;

  if (this.order) {
    outerStyle.zIndex = this.order;
  }
  // const paragraphSetMarkup = new ParagraphMarkup(markupInst);

  const ls: LayoutStyle = {
    styleNode: bounds,
    outerStyle,
    outerClass,
    isVertical: false,
  };

  ls.isVertical = false;
  layoutContext(style, cHorizontal, ls);
  ls.isVertical = true;
  layoutContext(style, cVertical, ls);
  outerStyle = ls.outerStyle;
  outerClass = ls.outerClass;

  backgroundContext(this.type, style, this);
  effectContext(this.type, style, this.effects);
  strokeContext(this.type, style, this);

  const pmContext: ParagraphMarkup = {
    content: null,
    node: this,
    para: '',
    styleCache: {},
    currStyle: 0,
    ps: [],
  };
  if (this.type === Nodes.TEXT) {
    textFont.call(style, this.style);
    paragraphContext(this.type, pmContext);
    content = pmContext.content;
  }

  const nm: NodeMarkup = {
    node: this,
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

  markupContext(this, nm, markup, indent, createComponent, createNode);
}
