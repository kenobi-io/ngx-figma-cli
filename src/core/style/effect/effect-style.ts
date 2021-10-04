import { EffectSetStyle } from './effect-set-style';
import { EffectParamStyle } from './effect-param-style';
import { Effects } from '../../api';
import { Style } from '../style';
import { InnerArrow } from '../../inner-arrow';

export class EffectStyle implements EffectSetStyle {
  public style: Partial<Style>;
  private effectsMap: Map<Effects, InnerArrow>;

  constructor(style: Partial<Style>, effectsMap?: Map<Effects, InnerArrow>) {
    this.style = style;
    this.effectsMap = effectsMap ? effectsMap : this.effects();
  }

  public invoke(effectEnum: Effects, effectParamStyle: EffectParamStyle): void {
    this.effectsMap.get(effectEnum).call(this, effectParamStyle);
  }

  private effects(): Map<Effects, InnerArrow> {
    return new Map()
      .set(Effects.DROP_SHADOW, (param: EffectParamStyle) =>
        this.dropShadowEffect(param)
      )
      .set(Effects.INNER_SHADOW, (param: EffectParamStyle) =>
        this.innerShadowEffect(param)
      )
      .set(Effects.LAYER_BLUR, (param: EffectParamStyle) =>
        this.layerBlurEffect(param)
      );
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
