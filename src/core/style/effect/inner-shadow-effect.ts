import { EffectPropertyFigma } from '../../api';
import { colorStyleToString } from '../../component';
import { Style } from '../style';

//TODO: add desc
export function innerShadowEffect<T extends Partial<Style>>(
  this: T,
  effect: EffectPropertyFigma,
  _colorStyleToString?: () => string
): void {
  const color = _colorStyleToString
    ? _colorStyleToString()
    : colorStyleToString.call(effect.color);
  this.boxShadow = `inset ${effect.offset.x} px 
          ${effect.offset.y} px 
          ${effect.radius} px 
          ${color}`;
}
