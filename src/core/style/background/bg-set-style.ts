import { NodeTypes, TypePaints } from '../../api';
import { SetStyle } from '../set-style';
import { Style } from '../style';
import { BackgroundParamStyle } from './param-bg-style';

export interface BackgroundSetStyle extends SetStyle<Partial<Style>, TypePaints | NodeTypes> {
    style: Partial<Style>;
    set(typePaintEnum:  TypePaints | NodeTypes, bgParamStyle: BackgroundParamStyle): void;
}