import { EffectParamStyle } from './effect-param-style';
import { EffectEnum } from '../../api';
import { Style } from '../style';
import { SetStyle } from '../set-style';

export interface EffectSetStyle extends SetStyle<Partial<Style>, EffectEnum> {
    style: Partial<Style>;
    set(effectEnum: EffectEnum, effectParamStyle: EffectParamStyle): void;
}


