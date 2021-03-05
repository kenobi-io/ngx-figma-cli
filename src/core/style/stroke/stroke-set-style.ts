import { NodeTypeEnum } from '../../api';
import { SetStyle } from '../set-style';
import { Style } from '../style';
import { StrokeParamStyle } from './stroke-param-style';

export interface StrokeSetStyle extends SetStyle<Partial<Style>, NodeTypeEnum> {
    style: Partial<Style>;
    set(nodeTypeEnum: NodeTypeEnum, strokeParamStyle: StrokeParamStyle): void;
}