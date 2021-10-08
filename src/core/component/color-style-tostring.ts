import { ColorStyle } from '../api/figma/nodes/figma';

//TODO: add desc
export function colorStyleToString<T extends Partial<ColorStyle>>(
  this: T
): string {
  return `rgba(${Math.round(this.r * 255)}, ${Math.round(
    this.g * 255
  )}, ${Math.round(this.b * 255)}, ${this.a})`;
}
