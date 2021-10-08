import { colorStyleToString } from '../../component';
import { Background, ColorStyle, ItemNode } from '../../api';
import { lastPaint } from './last-paint';
import { Style } from '../style';

//TODO: add desc
export function solidBg<T extends Partial<Style>>(
  this: T,
  node: ItemNode,
  _lastPaint?: () => Background | null,
  _colorStyleToString?: (this: Partial<ColorStyle>) => string
): void {
  const lastFill = _lastPaint ? _lastPaint() : lastPaint.call(node.fills);
  if (lastFill) {
    this.backgroundColor = _colorStyleToString
      ? _colorStyleToString.call(lastFill.color)
      : colorStyleToString.call(lastFill.color);
    lastFill.opacity && (this.opacity = `${lastFill.opacity}`);
  }
}
