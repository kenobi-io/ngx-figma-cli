import { EffectPropertyFigma } from '../../api';
import { ParamStyle } from '../param-style';

export interface EffectParamStyle extends ParamStyle {
    value: EffectPropertyFigma;
}
