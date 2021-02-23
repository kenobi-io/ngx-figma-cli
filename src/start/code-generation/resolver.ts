import {
    BottomConstraint,
    CenterConstraint,
    LayoutConstraint,
    LeftConstraint,
    LeftRightConstraint,
    RightConstraint,
    ScaleConstraint,
    SetLayoutConstraint,
    TypePaintEnum,
    SetBackground,
    ImageBackground,
    SolidBackground,
    LinearGradientBackground,
    RadialGradientBackground,
    ApplyFont,
    SetFont,
    SetEffect,
    EffectEnum,
    DropShadowEffect,
    InnerShadowEffect,
    LayerBlurEffect
} from '../../core';

export class Resolver {

    public lcsMap:
        Map<LayoutConstraint,
            SetLayoutConstraint<Partial<CSSStyleDeclaration>>>;
    public backgroundMap:
        Map<TypePaintEnum,
            SetBackground<Partial<CSSStyleDeclaration>>>;
    public effectMap:
        Map<EffectEnum,
            SetEffect<Partial<CSSStyleDeclaration>>>;
    public fontMap:
        Map<string,
            SetFont<Partial<CSSStyleDeclaration>>>;

    constructor(style: Partial<CSSStyleDeclaration>) {
        this.layoutConstraints(style);
        this.background(style);
        this.effect(style);
        this.font(style);
    }

    public layoutConstraints(style: Partial<CSSStyleDeclaration>) {
        this.lcsMap = new Map();
        this.lcsMap.set(LayoutConstraint.LEFT_RIGHT,
            new LeftRightConstraint(style));
        this.lcsMap.set(LayoutConstraint.LEFT,
            new LeftConstraint(style));
        this.lcsMap.set(LayoutConstraint.RIGHT,
            new RightConstraint(style));
        this.lcsMap.set(LayoutConstraint.SCALE,
            new ScaleConstraint(style));
        this.lcsMap.set(LayoutConstraint.CENTER,
            new CenterConstraint(style));
        this.lcsMap.set(LayoutConstraint.BOTTOM,
            new BottomConstraint(style));
    }

    public background(style: Partial<CSSStyleDeclaration>) {
        this.backgroundMap = new Map();
        this.backgroundMap .set(TypePaintEnum.IMAGE,
            new ImageBackground(style));
        this.backgroundMap .set(TypePaintEnum.SOLID,
            new SolidBackground(style));
        this.backgroundMap .set(TypePaintEnum.GRADIENT_LINEAR,
            new LinearGradientBackground(style));
        this.backgroundMap .set(TypePaintEnum.GRADIENT_RADIAL,
            new RadialGradientBackground(style));
    }

    public effect(style: Partial<CSSStyleDeclaration>) {
        this.effectMap = new Map();
        this.effectMap.set(EffectEnum.DROP_SHADOW,
            new DropShadowEffect(style));
        this.effectMap.set(EffectEnum.INNER_SHADOW,
            new InnerShadowEffect(style));
        this.effectMap.set(EffectEnum.LAYER_BLUR,
            new LayerBlurEffect(style));
    }

    public font(style: Partial<CSSStyleDeclaration>) {
        this.fontMap = new Map();
        this.fontMap.set('apply', new ApplyFont(style));
    }

}