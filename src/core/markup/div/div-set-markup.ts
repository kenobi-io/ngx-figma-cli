import { SetMarkup } from '../set-markup';
import { Markup } from '../markup';
import { Nodes, Characters } from '../../api';
import { ComponentParamMarkup } from './div-param-markup';

export interface DivSetMarkup {
  // extends SetMarkup<Partial<Markup>, Nodes | Characters> {
  markup: Partial<Markup>;
  invoke(
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
    divPMp: ComponentParamMarkup
  ): void;
}
