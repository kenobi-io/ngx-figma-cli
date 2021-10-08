import { ComponentMap } from '../../component';
import { ItemNode, Nodes } from '../../api';
import { divMarkup } from './div-markup';
import { markup } from './markup';
import { NodeMarkup } from './node-markup';
import { vectorMarkup } from './vector-markup';
import { Markup } from '../markup';

export function markupContext(
  node: Partial<ItemNode>,
  param: NodeMarkup,
  markupInst,
  indent: string,
  createComponent: (
    this: Partial<ItemNode>,
    imgMap: [],
    componentMap: ComponentMap
  ) => ComponentMap,
  createNode: (
    this: Partial<ItemNode>,
    parent: Partial<ItemNode>,
    lastVertical: number,
    indent: string,
    markup: Markup
  ) => void
) {
  if (parent != null) {
    divMarkup.call(markupInst, param);
  }

  if (node.id !== markupInst.component.id && node.name.charAt(0) === '#') {
    // buildSelectorMarkupAndComponent.call(
    //   markupInst,
    //   param,
    //   divMarkup,
    //   createComponent
    // );
    const nodeName = param.node.name.replace(/\W+/g, '');
    param.nodeName = `app-C${nodeName}`;
    divMarkup.call(markupInst, param);
    createComponent.call(
      param.node,
      markupInst.imgMap,
      markupInst.componentMap
    );
  } else if (node.type === Nodes.VECTOR) {
    vectorMarkup.call(markupInst, param);
  } else {
    markup.call(markupInst, param, null, divMarkup, createNode);
  }

  if (parent != null) {
    markupInst.append(`  </div>`, indent);
    markupInst.append(`</div>`, indent);
  }
}
