import {
    ColorPropertyFigma,
    EffectPropertyFigma,
    PaintPropertyFigma,
    LayoutConstraintHorizontalEnum,
    LayoutConstraintVerticalEnum,
    TypePaintEnum,
    EffectEnum
} from '../api';
import { RectangleFigma } from '../api';

export interface Bound {
    left: number;
    right: number;
    top: number;
    bottom: number;
    width: number;
    height: number;
}

export interface StyleModel {
    bound: Bound;
    colorToString(color: ColorPropertyFigma): string;
    dropShadow(effect: EffectPropertyFigma): string;
    innerShadow(effect: EffectPropertyFigma): string;
    imageUrl(hash: string): string;
    backgroundSize(scaleMode: string): string | null;
    getPaint(paintList: PaintPropertyFigma[]): PaintPropertyFigma | null;
    paintToLinearGradient(paint: PaintPropertyFigma): string;
    paintToRadialGradient(paint: PaintPropertyFigma): string;
    applyFontStyle(style: CSSStyleDeclaration, fontStyle: ApplyFontStyle): void;
    layoutConstraint(
        style: any,
        bound: any,
        horizontal: LayoutConstraintHorizontalEnum,
        vertical: LayoutConstraintVerticalEnum,
        outerStyle?: any,
        outerClass?: any): void;
    setBackground(node: RectangleFigma, style: any): void;
    setEffect(effects: EffectPropertyFigma[], style: any): void;
}

export interface ApplyFontStyle { 
    fontSize: string; 
    fontWeight: any; 
    fontFamily: any; 
    textAlignHorizontal: any; 
    italic: any; 
    lineHeightPercent: number; 
    letterSpacing: any; 
}

export class ComponentStyleModel implements StyleModel {

    private setStyle: any = {};
    public bound: Bound;

    constructor() {
        this.init();
    }

    private init() {
        this.initLayoutConstraintVertical();
        this.initBackground();
        this.iniEffect();
    }

    private iniEffect(): void {
        this.setStyle[EffectEnum.DROP_SHADOW] = (this.style: any, effect: EffectPropertyFigma) => {
            this.style.box-shadow = this.dropShadow(effect);
        };
        this.setStyle[EffectEnum.INNER_SHADOW] = (this.style: any, effect: EffectPropertyFigma) => {
            this.style.box-shadow = this.innerShadow(effect);
        };
        this.setStyle[EffectEnum.LAYER_BLUR] = (this.style: any, effect: EffectPropertyFigma) => {
            this.style.filter = `blur(${effect.radius}px)`;
        };
    }


    // model
    public getPaint(paintList: PaintPropertyFigma[]): PaintPropertyFigma | null {
        if (paintList && paintList.length > 0) {
            return paintList[paintList.length - 1];
        }
        return null;
    }

    // role font.apply()
    public applyFontStyle(this.style: CSSStyleDeclaration, fontStyle: ApplyFontStyle): void {
        if (fontStyle) {
            this.style.fontSize = fontStyle.fontSize + 'px';
            this.style.fontWeight = fontStyle.fontWeight;
            this.style.fontFamily = fontStyle.fontFamily;
            this.style.textAlign = fontStyle.textAlignHorizontal;
            this.style.fontStyle = fontStyle.italic ? 'italic' : 'normal';
            this.style.lineHeight = `${fontStyle.lineHeightPercent * 1.25}%`;
            this.style.letterSpacing = `${fontStyle.letterSpacing}px`;
        }
    }

    // role layout.cnstraint()
    public layoutConstraint(
        style: any,
        bound: any,
        horizontal: LayoutConstraintHorizontalEnum,
        vertical: LayoutConstraintVerticalEnum,
        outerStyle?: any,
        outerClass?: any): void {

        this.setStyle[horizontal](style, bound, outerStyle, outerClass);
        this.setStyle[vertical](style, bound, outerStyle, outerClass);
    }

    // role background.set()
    public setBackground(node: RectangleFigma, style: any): void {
        const lastFill = this.getPaint(node.fills);
        if (lastFill) {
            this.setStyle[lastFill.type](style, lastFill);
        }
    }

    // role effect.set()
    public setEffect(effects: EffectPropertyFigma[], style: any): void {
        for (let i = 0; i < effects.length; i++) {
            const effect = effects[i];
            this.setStyle[effect.type](effect, style);
        }
    }
}