import { Style } from "../style";
import { NodeTypes, TypePaints } from '../../api';
import { StrokeSetStyle } from "./stroke-set-style";
import { StrokeParamStyle } from './stroke-param-style';

export class StrokeStyle implements StrokeSetStyle {


    public style: Partial<Style>;
    private strokeMap: Map<NodeTypes, string>;

    constructor(style: Partial<Style>, strokeMap?: Map<NodeTypes, string>) {
        this.style = style;
        this.strokeMap = strokeMap ? strokeMap : this.stroke();
    }

    public set(nodeTypeEnum: NodeTypes, strokeParamStyle: StrokeParamStyle): void {
        const key = this.strokeMap.get(nodeTypeEnum);
        key && this[key](strokeParamStyle);
    }

    private stroke(): Map<NodeTypes, string> {
        const strokeMap = new Map();
        strokeMap.set(NodeTypes.RECTANGLE, 'borderRect');
        strokeMap.set(NodeTypes.RECTANGLE, 'radiusRect'); // TODO: =-> duplicate key is fail
        strokeMap.set(NodeTypes.TEXT, 'text');
        return strokeMap;
    }

    private borderRect(sps: StrokeParamStyle) {
        const lastStroke = this.style.lastPaint(sps.value.strokes);
        if (lastStroke) {
            if (lastStroke.type === TypePaints.SOLID) {
                const weight = sps.value.strokeWeight || 1;
                this.style.border =
                    `${weight}px solid ${this.style.colorToString(lastStroke.color)}`;
            }
        }
    }

    private radiusRect(sps: StrokeParamStyle) {
        const cornerRadii = sps.value.rectangleCornerRadii;
        if (cornerRadii
            && cornerRadii.length === 4
            && cornerRadii[0] + cornerRadii[1] + cornerRadii[2] + cornerRadii[3] > 0) {
            this.style.borderRadius =
                `${cornerRadii[0]}px ${cornerRadii[1]}px ${cornerRadii[2]}px ${cornerRadii[3]}px`;
        }
    }

    private text(sps: StrokeParamStyle) {
        const lastStroke = this.style.lastPaint(sps.value.strokes);
        if (lastStroke) {
            const weight = sps.value.strokeWeight || 1;
            this.style.stroke = `${weight}px ${this.style.colorToString(lastStroke.color)}`;
        }
    }
}

