import { NodeTypeEnum } from '../../api';
import { SetStyle } from '../set-style';
import { Style } from '../style';
import { FontParamStyle } from './font-param-style';

export interface FontSetStyle extends SetStyle<Partial<Style>, NodeTypeEnum> {
    style: Partial<Style>;
    set(nodeTypeEnum: NodeTypeEnum, fontParamStyle: FontParamStyle): void;
}