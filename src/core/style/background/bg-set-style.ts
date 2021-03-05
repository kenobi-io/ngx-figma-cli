import { NodeTypeEnum, TypePaintEnum } from '../../api';
import { SetStyle } from '../set-style';
import { Style } from '../style';
import { BackgroundParamStyle } from './param-bg-style';

export interface BackgroundSetStyle extends SetStyle<Partial<Style>, TypePaintEnum | NodeTypeEnum> {
    style: Partial<Style>;
    set(typePaintEnum:  TypePaintEnum | NodeTypeEnum, bgParamStyle: BackgroundParamStyle): void;
}