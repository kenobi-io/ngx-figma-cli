import { colorStyleToString } from '../../component';
import { Background, ColorStyle, ItemNode, TypePaints } from '../../api';
import { lastPaint } from '../background/last-paint';
import { Style } from '../style';

//TODO: add desc
export function borderRect<T extends Partial<Style>>(
  this: T,
  node: ItemNode,
  _lastPaint?: () => Background | null,
  _colorStyleToString?: (this: Partial<ColorStyle>) => string
): void {
  const lastStroke = _lastPaint ? _lastPaint() : lastPaint.call(node.strokes);
  if (lastStroke) {
    if (lastStroke.type === TypePaints.SOLID) {
      const weight = node.strokeWeight || 1;
      this.border = `${weight}px solid ${
        _colorStyleToString
          ? _colorStyleToString.call(lastStroke.color)
          : colorStyleToString.call(lastStroke.color)
      }`;
    }
  }
  const cornerRadii = node.rectangleCornerRadii;
  if (
    cornerRadii &&
    cornerRadii.length === 4 &&
    cornerRadii[0] + cornerRadii[1] + cornerRadii[2] + cornerRadii[3] > 0
  ) {
    this.borderRadius = `${cornerRadii[0]}px ${cornerRadii[1]}px ${cornerRadii[2]}px ${cornerRadii[3]}px`;
  }
}
