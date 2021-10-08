import { Style } from '../style';
import { ItemNode, Background, ColorStyle } from '../../api';
import { paintToRadialGradient } from './paint-toradial-gradient';
import { lastPaint } from './last-paint';

//TODO: add desc
export function radialGradient<T extends Partial<Style>>(
  this: T,
  node: ItemNode,
  _lastPaint?: () => Background | null,
  _paintToRadialGradient?: <T extends Partial<Background>>(
    this: T,
    colorStyleToString?: (this: Partial<ColorStyle>) => string
  ) => string,
  _colorStyleToString?: (this: Partial<ColorStyle>) => string
): void {
  const lastFill = _lastPaint ? _lastPaint() : lastPaint.call(node.fills);
  if (lastFill) {
    this.background = _paintToRadialGradient
      ? _paintToRadialGradient.call(lastFill, _colorStyleToString)
      : paintToRadialGradient.call(lastFill, _colorStyleToString);
  }
}
