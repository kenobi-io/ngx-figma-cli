import { ItemNode } from '../api';
import { ComponentMap } from './component-map';
import { Markup } from '../markup';
import { createNode } from './create-node';

//TODO: add desc
export function createComponent<T extends Partial<ItemNode>>(
  this: T,
  imgMap: [],
  componentMap: ComponentMap,
  _createNode?: (
    parent: T,
    lastVertical: number,
    indent: string,
    markup: Markup
  ) => void
): ComponentMap {
  let markupInst = {} as Markup;
  const name = this.name.replace(/\W+/g, '');
  const instance = name + this.id.replace(';', 'S').replace(':', 'D');
  markupInst.component = this;
  markupInst.imgMap = imgMap;
  markupInst.componentMap = componentMap;
  _createNode
    ? _createNode(null, null, '  ', markupInst)
    : createNode.call(this, null, null, '  ', markupInst);
  componentMap[this.id] = {
    instance,
    name,
    doc: markupInst.doc,
  };
  return componentMap;
}
