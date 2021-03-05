import { Style } from "../style";
import { NodeTypeEnum, TypePaintEnum } from '../../api';
import { StrokeSetStyle } from "./stroke-set-style";
import { StrokeParamStyle } from './stroke-param-style';

export class StrokeStyle implements StrokeSetStyle {


    public style: Partial<Style>;
    private strokeMap: Map<NodeTypeEnum, Function>;

    constructor(style: Partial<Style>) {
        this.style = style;
        this.stroke();
    }

    public set(nodeTypeEnum: NodeTypeEnum, strokeParamStyle: StrokeParamStyle): void {
        if (nodeTypeEnum) {
            const func = this.strokeMap.get(nodeTypeEnum);
            func && func(strokeParamStyle);
        }
    }

    private stroke() {
        this.strokeMap = new Map();
        this.strokeMap.set(NodeTypeEnum.RECTANGLE,
            this.borderRect);
        this.strokeMap.set(NodeTypeEnum.RECTANGLE,
            this.radiusRect);
        this.strokeMap.set(NodeTypeEnum.TEXT,
            this.text);
    }

    private borderRect(sps: StrokeParamStyle) {
        if (this.style.colorToString && this.style.lastPaint) {
            const lastStroke = this.style.lastPaint(sps.value.strokes);
            if (lastStroke) {
                if (lastStroke.type === TypePaintEnum.SOLID) {
                    const weight = sps.value.strokeWeight || 1;
                    this.style.border = 
                    `${weight}px solid ${this.style.colorToString(lastStroke.color)}`;
                }
            }
        }
    }

    private radiusRect(sps: StrokeParamStyle) {
        if (this.style.colorToString && this.style.lastPaint) {
            const cornerRadii = sps.value.rectangleCornerRadii;
            if (cornerRadii 
                && cornerRadii.length === 4 
                && cornerRadii[0] + cornerRadii[1] + cornerRadii[2] + cornerRadii[3] > 0) {
              this.style.borderRadius = 
                `${cornerRadii[0]}px ${cornerRadii[1]}px ${cornerRadii[2]}px ${cornerRadii[3]}px`;
            }
        }
    }

    private text(sps: StrokeParamStyle) {
        if (this.style.colorToString && this.style.lastPaint) {
            const lastStroke = this.style.lastPaint(sps.value.strokes);
            if (lastStroke) {
              const weight = sps.value.strokeWeight || 1;
              this.style.stroke = `${weight}px ${this.style.colorToString(lastStroke.color)}`;
            }
        }
    }
}

