// import { SetBackground } from './set-background';
// import { ParamBackground } from './param-background';

import {
    NodeTypes,
    TypePaints,
    FrameFigma,
    RectangleFigma
} from "../../api";
import { Style } from "../style";
import { BackgroundParamStyle } from "./param-bg-style";
import { BackgroundSetStyle } from "./bg-set-style";

export class BackgroundStyle implements BackgroundSetStyle {

    public style: Partial<Style>;
    private bgsMap: Map<TypePaints | NodeTypes, string>;

    constructor(style: Partial<Style>, bgsMap?: Map<TypePaints | NodeTypes, string>) {
        this.style = style;
        this.bgsMap = bgsMap ? bgsMap : this.bg();
    }

    public set(bgEnum: TypePaints | NodeTypes,
        bgParamStyle: BackgroundParamStyle): void {
        const key: string = this.bgsMap.get(bgEnum);
        key && this[key](bgParamStyle);
    }

    private bg(): Map<TypePaints | NodeTypes, string> {
        const bgsMap = new Map();
        bgsMap.set(TypePaints.IMAGE, 'image');
        bgsMap.set(TypePaints.SOLID, 'solid');
        bgsMap.set(TypePaints.GRADIENT_LINEAR, 'linearGradient');
        bgsMap.set(TypePaints.GRADIENT_RADIAL, 'radialGradient');
        bgsMap.set(NodeTypes.FRAME, 'fraComInst');
        bgsMap.set(NodeTypes.COMPONENT, 'fraComInst');
        bgsMap.set(NodeTypes.INSTANCE, 'fraComInst');
        bgsMap.set(NodeTypes.TEXT, 'text');
        return bgsMap;
    }

    private image(bgP: BackgroundParamStyle) {
        const lastFill = this.style.lastPaint((bgP.value as RectangleFigma).fills);
        if (lastFill) {
            this.style.backgroundImage = this.style.imageUrl(lastFill.imageRef);
            if (lastFill.scaleMode === 'FILL') {
                this.style.backgroundSize = 'cover';
            } else {
                this.style.backgroundSize = undefined;
            }
        }
    }

    private solid(bgP: BackgroundParamStyle) {
        const lastFill = this.style.lastPaint((bgP.value as RectangleFigma).fills);
        if (lastFill) {
            this.style.backgroundColor = this.style.colorToString(lastFill.color);
            this.style.opacity = `${lastFill.opacity}`;
        }
    }

    private linearGradient(bgP: BackgroundParamStyle) {
        const lastFill = this.style.lastPaint((bgP.value as RectangleFigma).fills);
        if (lastFill) {
            this.style.background = this.style.paintToLinearGradient(lastFill);
        }
    }

    private radialGradient(bgP: BackgroundParamStyle) {
        const lastFill = this.style.lastPaint((bgP.value as RectangleFigma).fills);
        if (lastFill) {
            this.style.background = this.style.paintToRadialGradient(lastFill);
        }
    }

    private fraComInst(bgP: BackgroundParamStyle) {
        this.style.backgroundColor = this.style.colorToString((bgP.value as FrameFigma).backgroundColor);
        if ((bgP.value as FrameFigma).clipsContent) {
            this.style.overflow = 'hidden';
        }
    }

    private text(bgP: BackgroundParamStyle) {
        const lastFill = this.style.lastPaint((bgP.value as RectangleFigma).fills);
        if (lastFill) {
            this.style.color = this.style.colorToString(lastFill.color);
        }
    }
}
