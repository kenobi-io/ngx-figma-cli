import { FontSetStyle } from './font-set-style';
import { FontParamStyle } from './font-param-style';
import { Nodes } from '../../api';
import { Style } from '../style';
import { InnerArrow } from 'src/core/inner-arrow';
export class FontStyle implements FontSetStyle {
  public style: Partial<Style>;
  private fontMap: Map<Nodes, InnerArrow>;

  constructor(style: Partial<Style>, fontMap?: Map<Nodes, InnerArrow>) {
    this.style = style;
    this.fontMap = fontMap ? fontMap : this.font();
  }

  public invoke(nodeTypeEnum: Nodes, fontParamStyle: FontParamStyle): void {
    this.fontMap.get(nodeTypeEnum).call(this, fontParamStyle);
  }

  private font() {
    return new Map().set(Nodes.TEXT, (param: FontParamStyle) =>
      this.text(param)
    );
  }

  public text(pf: FontParamStyle) {
    this.style.fontSize = pf.value.fontSize + 'px';
    this.style.fontWeight = +pf.value.fontWeight;
    this.style.fontFamily = pf.value.fontFamily;
    this.style.textAlign = pf.value.textAlignHorizontal;
    this.style.fontStyle = pf.value.italic ? 'italic' : 'normal';
    this.style.lineHeight = `${pf.value.lineHeightPercent * 1.25}%`;
    this.style.letterSpacing = `${pf.value.letterSpacing}px`;
  }
}
