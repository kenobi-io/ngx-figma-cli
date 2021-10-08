import { colorStyleToString } from '../../component';
import { Background, ColorStyle } from '../../api';

//TODO: add desc
export function paintToLinearGradient<T extends Partial<Background>>(
  this: T,
  _colorStyleToString?: (this: Partial<ColorStyle>) => string
): string {
  const handles = this.gradientHandlePositions;
  const handle0 = handles[0];
  const handle1 = handles[1];

  const ydiff = handle1.y - handle0.y;
  const xdiff = handle0.x - handle1.x;

  const angle = Math.atan2(-xdiff, -ydiff);
  const stops = this.gradientStops
    .map((stop: { color: ColorStyle; position: number }) => {
      return `${
        _colorStyleToString
          ? _colorStyleToString.call(stop.color)
          : colorStyleToString.call(stop.color)
      }
                      ${Math.round(stop.position * 100)}%`;
    })
    .join(', ');

  return `linear-gradient(${angle}rad, ${stops})`;
}
