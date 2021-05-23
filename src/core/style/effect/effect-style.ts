import { EffectSetStyle } from './effect-set-style';
import { EffectParamStyle } from './effect-param-style';
import { Effects } from '../../api';
import { Style } from '../style';

export class EffectStyle implements EffectSetStyle {

    public style: Partial<Style>;
    private effectsMap: Map<Effects, string>;

    constructor(style: Partial<Style>, effectsMap?: Map<Effects, string>) {
        this.style = style;
        this.effectsMap = effectsMap ? effectsMap : this.effects();
    }


    public set(effectEnum: Effects, effectParamStyle: EffectParamStyle): void {
        const key = this.effectsMap.get(effectEnum);
        key && this[key](effectParamStyle);
    }

    private effects(): Map<Effects, string> {
        const effectsMap = new Map();
        effectsMap.set(Effects.DROP_SHADOW, 'dropShadowEffect');
        effectsMap.set(Effects.INNER_SHADOW, 'innerShadowEffect');
        effectsMap.set(Effects.LAYER_BLUR, 'layerBlurEffect');
        return effectsMap;
    }

    private dropShadowEffect(pe: EffectParamStyle) {
        this.style.boxShadow = this.style.dropShadow(pe.value);
    }

    private innerShadowEffect(pe: EffectParamStyle) {
        this.style.boxShadow = this.style.innerShadow(pe.value);
    }

    private layerBlurEffect(pe: EffectParamStyle) {
        this.style.filter = `blur(${pe.value.radius}px)`;
    }

}