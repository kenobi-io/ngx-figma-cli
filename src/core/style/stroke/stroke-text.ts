import { colorStyleToString } from '../../component';
import { Background, ColorStyle, ItemNode } from '../../api';
import { lastPaint } from '../background/last-paint';
import { Style } from '../style';

//TODO: add desc
export function strokeText<T extends Partial<Style>>(
  this: T,
  node: ItemNode,
  _lastPaint?: () => Background | null,
  _colorStyleToString?: (this: Partial<ColorStyle>) => string
): void {
  const lastStroke = _lastPaint ? _lastPaint() : lastPaint.call(node.strokes);
  const color = _colorStyleToString
    ? _colorStyleToString.call(lastStroke.color)
    : colorStyleToString.call(lastStroke.color);
  if (lastStroke) {
    const weight = node.strokeWeight || 1;
    this.stroke = `${weight}px ${color}`;
  }
}
