import { SetMarkup } from '../set-markup';
import { Markup } from '../markup';
import { NodeTypes, Characters } from '../../api';
import { DivParamMarkup } from './div-param-markup';

export interface DivSetMarkup extends SetMarkup<Partial<Markup>, NodeTypes | Characters> {
    markup: Partial<Markup>;
    set(nodeTypes:  NodeTypes | Characters, divParamMarkup: DivParamMarkup): void;
}