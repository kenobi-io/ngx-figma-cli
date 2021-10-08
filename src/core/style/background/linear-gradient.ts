import { Background, ColorStyle, ItemNode } from '../../api';
import { lastPaint } from './last-paint';
import { Style } from '../style';
import { paintToLinearGradient } from './paint-tolinear-gradient';

//TODO: add desc
export function linearGradient<T extends Partial<Style>>(
  this: T,
  node: ItemNode,
  _lastPaint?: () => Background | null,
  _paintToLinearGradient?: (
    colorStyleToString?: (this: Partial<ColorStyle>) => string
  ) => string,
  _colorStyleToString?: (this: Partial<ColorStyle>) => string
): void {
  const lastFill = _lastPaint ? _lastPaint() : lastPaint.call(node.fills);
  if (lastFill) {
    this.background = _paintToLinearGradient
      ? _paintToLinearGradient.call(lastFill, _colorStyleToString)
      : paintToLinearGradient.call(lastFill, _colorStyleToString);
  }
}
