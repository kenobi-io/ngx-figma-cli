import { Style } from '../style';
import { TypeStylePropertyFigma } from '../../api';

export class TextFontStyle extends Style {
  //   private style: T;
  public setText(property: Partial<TypeStylePropertyFigma>): Partial<Style> {
    this.fontSize = property.fontSize + 'px';
    this.fontWeight = +property.fontWeight;
    this.fontFamily = property.fontFamily;
    this.textAlign = property.textAlignHorizontal;
    this.fontStyle = property.italic ? 'italic' : 'normal';
    this.lineHeight = `${property.lineHeightPercent * 1.25}%`;
    this.letterSpacing = `${property.letterSpacing}px`;
    return this;
  }
}
export function byTextFontStyle<T extends Partial<Style>>(
  model: T,
  property: Partial<TypeStylePropertyFigma>
) {
  model.fontSize = property.fontSize + 'px';
  model.fontWeight = +property.fontWeight;
  model.fontFamily = property.fontFamily;
  model.textAlign = property.textAlignHorizontal;
  model.fontStyle = property.italic ? 'italic' : 'normal';
  model.lineHeight = `${property.lineHeightPercent * 1.25}%`;
  model.letterSpacing = `${property.letterSpacing}px`;
}
