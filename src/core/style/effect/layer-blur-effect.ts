import { EffectPropertyFigma } from '../../api';
import { Style } from '../style';

//TODO: add desc
export function layerBlurEffect<T extends Partial<Style>>(
  this: T,
  effect: EffectPropertyFigma
): void {
  this.filter = `blur(${effect.radius}px)`;
}
