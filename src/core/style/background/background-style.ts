// import { SetBackground } from './set-background';
// import { ParamBackground } from './param-background';

import {
    NodeTypeEnum,
    TypePaintEnum,
    FrameFigma,
    RectangleFigma
} from "../../api";
import { Style } from "../style";
import { BackgroundParamStyle } from "./param-bg-style";
import { BackgroundSetStyle } from "./bg-set-style";

export class BackgroundStyle implements BackgroundSetStyle {

    public style: Partial<Style>;
    private bgsMap: Map<TypePaintEnum | NodeTypeEnum, Function>;

    constructor(style: Partial<Style>) {
        this.style = style;
        this.bg();
    }

    public set(bgEnum: TypePaintEnum | NodeTypeEnum, 
               bgParamStyle: BackgroundParamStyle): void {
        const func = this.bgsMap.get(bgEnum);
        func && func(bgParamStyle);
    }

    private bg() {
        this.bgsMap = new Map();
        this.bgsMap.set(TypePaintEnum.IMAGE,
            this.image);
        this.bgsMap.set(TypePaintEnum.SOLID,
            this.solid);
        this.bgsMap.set(TypePaintEnum.GRADIENT_LINEAR,
            this.linearGradient);
        this.bgsMap.set(TypePaintEnum.GRADIENT_RADIAL,
            this.radialGradient);
            
        this.bgsMap.set(NodeTypeEnum.FRAME,
            this.fraComInst);
        this.bgsMap.set(NodeTypeEnum.COMPONENT,
            this.fraComInst);
        this.bgsMap.set(NodeTypeEnum.INSTANCE,
            this.fraComInst);
        this.bgsMap.set(NodeTypeEnum.TEXT,
            this.text);
    }

    private image(bgP: BackgroundParamStyle) {
        if (this.style.imageUrl && this.style.lastPaint) {
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
    }

    private solid(bgP: BackgroundParamStyle) {
        if (this.style.colorToString && this.style.lastPaint) {
            const lastFill = this.style.lastPaint((bgP.value as RectangleFigma).fills);
            if (lastFill) {
                this.style.backgroundColor = this.style.colorToString(lastFill.color);
                this.style.opacity = `${lastFill.opacity}`;
            }
        }
    }

    private linearGradient(bgP: BackgroundParamStyle) {
        if (this.style.paintToLinearGradient && this.style.lastPaint) {
            const lastFill = this.style.lastPaint((bgP.value as RectangleFigma).fills);
            if (lastFill) {
                this.style.background = this.style.paintToLinearGradient(lastFill);
            }
        }
    }

    private radialGradient(bgP: BackgroundParamStyle) {
        if (this.style.paintToRadialGradient && this.style.lastPaint) {
            const lastFill = this.style.lastPaint((bgP.value as RectangleFigma).fills);
            if (lastFill) {
                this.style.background = this.style.paintToRadialGradient(lastFill);
            }
        }
    }

    private fraComInst(bgP: BackgroundParamStyle) {

        if (this.style.colorToString) {
            this.style.backgroundColor = this.style.colorToString((bgP.value as FrameFigma).backgroundColor);
        }
        if ((bgP.value as FrameFigma).clipsContent) {
            this.style.overflow = 'hidden';
        }
    }

    private text(bgP: BackgroundParamStyle) {
        if (this.style.colorToString && this.style.lastPaint) {
            const lastFill = this.style.lastPaint((bgP.value as RectangleFigma).fills);
            if (lastFill) {
                this.style.color = this.style.colorToString(lastFill.color);
            }
        }
    }
}