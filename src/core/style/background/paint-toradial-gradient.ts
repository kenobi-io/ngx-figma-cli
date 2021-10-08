import { colorStyleToString } from '../../component';
import { Background, ColorStyle } from '../../api';

//TODO: add desc
export function paintToRadialGradient<T extends Partial<Background>>(
  this: T,
  _colorStyleToString?: (this: Partial<ColorStyle>) => string
): string {
  const stops = this.gradientStops
    .map((stop: { color: any; position: number }) => {
      return `${
        _colorStyleToString
          ? _colorStyleToString.call(stop.color)
          : colorStyleToString.call(stop.color)
      } ${Math.round(stop.position * 60)}%`;
    })
    .join(', ');

  return `radial-gradient(${stops})`;
}
