import { Style } from '../style';
import { TypeStylePropertyFigma } from '../../api';

export function textFont<T extends Partial<Style>>(
  this: T,
  property: TypeStylePropertyFigma
) {
  this.fontSize = property.fontSize + 'px';
  this.fontWeight = +property.fontWeight;
  this.fontFamily = property.fontFamily;
  this.textAlign = property.textAlignHorizontal;
  this.fontStyle = property.italic ? 'italic' : 'normal';
  this.lineHeight = `${property.lineHeightPercent * 1.25}%`;
  this.letterSpacing = `${property.letterSpacing}px`;
}
