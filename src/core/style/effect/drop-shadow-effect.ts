import { colorStyleToString } from '../../component';
import { EffectPropertyFigma } from '../../api';
import { Style } from '../style';

//TODO: add desc
export function dropShadowEffect<T extends Partial<Style>>(
  this: T,
  effect: EffectPropertyFigma,
  _colorStyleToString?: () => string
): void {
  const color = _colorStyleToString
    ? _colorStyleToString()
    : colorStyleToString.call(effect.color);
  this.boxShadow = `${effect.offset.x}px
          ${effect.offset.y}px 
          ${effect.radius}px 
          ${color}`;
}
