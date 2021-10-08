import { EffectPropertyFigma, Effects, Nodes } from '../../api';
import { Style } from '../style';
import { dropShadowEffect } from './drop-shadow-effect';
import { innerShadowEffect } from './inner-shadow-effect';
import { layerBlurEffect } from './layer-blur-effect';

export function effectContext(
  types: Nodes | string,
  context: Partial<Style>,
  effects: Partial<EffectPropertyFigma>[]
): void {
  const map = new Map<Effects, (effect: EffectPropertyFigma) => void>()
    .set(Effects.DROP_SHADOW, dropShadowEffect)
    .set(Effects.INNER_SHADOW, innerShadowEffect)
    .set(Effects.LAYER_BLUR, layerBlurEffect);

  if (types === Nodes.RECTANGLE) {
    for (let effect of effects) {
      const invoke = map.get(effect.type);
      invoke && invoke.call(context, effect);
    }
  }
}
