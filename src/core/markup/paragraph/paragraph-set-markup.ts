import { SetMarkup } from '../set-markup';
import { Markup } from '../markup';
import { ParagraphParamMarkup } from './paragraph-param-markup';
import { NodeTypes } from '../../api';

export interface ParagraphSetMarkup extends SetMarkup<Partial<Markup>,  NodeTypes> {
    markup: Partial<Markup>;
    set(typePaintEnum:  NodeTypes, bgParamStyle: ParagraphParamMarkup): void;
}