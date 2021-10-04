import { Style } from '../style';
import { Nodes, TypePaints } from '../../api';
import { StrokeSetStyle } from './stroke-set-style';
import { StrokeParamStyle } from './stroke-param-style';
import { InnerArrow } from '../../inner-arrow';

export class StrokeStyle implements StrokeSetStyle {
  public style: Partial<Style>;
  private strokeMap: Map<Nodes, InnerArrow>;

  constructor(style: Partial<Style>, strokeMap?: Map<Nodes, InnerArrow>) {
    this.style = style;
    this.strokeMap = strokeMap ? strokeMap : this.stroke();
  }

  public invoke(nodeTypeEnum: Nodes, strokeParamStyle: StrokeParamStyle): void {
    this.strokeMap.get(nodeTypeEnum).call(this, strokeParamStyle);
  }

  private stroke(): Map<Nodes, InnerArrow> {
    const strokeMap = new Map();
    strokeMap.set(Nodes.RECTANGLE, (param: StrokeParamStyle) =>
      this.borderRect(param)
    );
    strokeMap.set(Nodes.TEXT, (param: StrokeParamStyle) => this.text(param));
    return strokeMap;
  }

  private borderRect(sps: StrokeParamStyle) {
    const lastStroke = this.style.lastPaint(sps.value.strokes);
    if (lastStroke) {
      if (lastStroke.type === TypePaints.SOLID) {
        const weight = sps.value.strokeWeight || 1;
        this.style.border = `${weight}px solid ${this.style.colorToString(
          lastStroke.color
        )}`;
      }
    }
    const cornerRadii = sps.value.rectangleCornerRadii;
    if (
      cornerRadii &&
      cornerRadii.length === 4 &&
      cornerRadii[0] + cornerRadii[1] + cornerRadii[2] + cornerRadii[3] > 0
    ) {
      this.style.borderRadius = `${cornerRadii[0]}px ${cornerRadii[1]}px ${cornerRadii[2]}px ${cornerRadii[3]}px`;
    }
  }

  private text(sps: StrokeParamStyle) {
    const lastStroke = this.style.lastPaint(sps.value.strokes);
    if (lastStroke) {
      const weight = sps.value.strokeWeight || 1;
      this.style.stroke = `${weight}px ${this.style.colorToString(
        lastStroke.color
      )}`;
    }
  }
}
