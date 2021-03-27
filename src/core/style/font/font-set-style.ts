import { NodeTypes } from '../../api';
import { SetStyle } from '../set-style';
import { Style } from '../style';
import { FontParamStyle } from './font-param-style';

export interface FontSetStyle extends SetStyle<Partial<Style>, NodeTypes> {
    style: Partial<Style>;
    set(nodeTypeEnum: NodeTypes, fontParamStyle: FontParamStyle): void;
}