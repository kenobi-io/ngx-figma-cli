import { EffectSetStyle } from './effect-set-style';
import { EffectParamStyle } from './effect-param-style';
import { EffectEnum } from '../../api';
import { Style } from '../style';

export class EffectStyle implements EffectSetStyle {

    public style: Partial<Style>;
    private effectsMap: Map<EffectEnum, Function>;

    constructor(style: Partial<Style>) {
        this.style = style;
        this.effects();
    }


    public set(effectEnum: EffectEnum, effectParamStyle: EffectParamStyle): void {
        if(effectEnum) {
            const func = this.effectsMap.get(effectEnum);  
            func && func(effectParamStyle);
        }
    }

    private effects() {
        this.effectsMap = new Map();
        this.effectsMap.set(EffectEnum.DROP_SHADOW, this.dropShadowEffect);
        this.effectsMap.set(EffectEnum.INNER_SHADOW, this.innerShadowEffect);
        this.effectsMap.set(EffectEnum.LAYER_BLUR, this.layerBlurEffect);
    }

    private dropShadowEffect(pe: EffectParamStyle) {
        if (this.style.dropShadow) {
            this.style.boxShadow = this.style.dropShadow(pe.value);
        }
    }

    private innerShadowEffect(pe: EffectParamStyle) {
        if (this.style.innerShadow) {
            this.style.boxShadow = this.style.innerShadow(pe.value);
        }
    }

    private layerBlurEffect(pe: EffectParamStyle) {
        if (this.style.innerShadow) {
            this.style.filter = `blur(${pe.value.radius}px)`;
        }
    }
     
}