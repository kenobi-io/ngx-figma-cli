import { NodeTypes } from '../../api';
import { SetStyle } from '../set-style';
import { Style } from '../style';
import { StrokeParamStyle } from './stroke-param-style';

export interface StrokeSetStyle extends SetStyle<Partial<Style>, NodeTypes> {
    style: Partial<Style>;
    set(nodeTypeEnum: NodeTypes, strokeParamStyle: StrokeParamStyle): void;
}