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

    public layoutConstraints(style: Partial<CSSStyleDeclaration>): 
                             Map<LayoutConstraint,
                             SetLayoutConstraint<Partial<CSSStyleDeclaration>>> {
        const lc = new Map();
        lc.set(LayoutConstraint.LEFT_RIGHT,
            new LeftRightConstraint(style));
        lc.set(LayoutConstraint.LEFT,
            new LeftConstraint(style));
        lc.set(LayoutConstraint.RIGHT,
            new RightConstraint(style));
        lc.set(LayoutConstraint.SCALE,
            new ScaleConstraint(style));
        lc.set(LayoutConstraint.CENTER,
            new CenterConstraint(style));
        lc.set(LayoutConstraint.BOTTOM,
            new BottomConstraint(style));
        return lc;
    }

    public background(style: Partial<CSSStyleDeclaration>): 
                             Map<TypePaintEnum,
                             SetBackground<Partial<CSSStyleDeclaration>>> {
        const bg = new Map();
        bg.set(TypePaintEnum.IMAGE,
            new ImageBackground(style));
        bg.set(TypePaintEnum.SOLID,
            new SolidBackground(style));
        bg.set(TypePaintEnum.GRADIENT_LINEAR,
            new LinearGradientBackground(style));
        bg.set(TypePaintEnum.GRADIENT_RADIAL,
            new RadialGradientBackground(style));
        return bg;
    }

    public effect(style: Partial<CSSStyleDeclaration>): 
                         Map<EffectEnum,
                         SetEffect<Partial<CSSStyleDeclaration>>> {
        const ef = new Map();
        ef.set(EffectEnum.DROP_SHADOW,
            new DropShadowEffect(style));
        ef.set(EffectEnum.INNER_SHADOW,
            new InnerShadowEffect(style));
        ef.set(EffectEnum.LAYER_BLUR,
            new LayerBlurEffect(style));
        return ef;
    }

    public font(style: Partial<CSSStyleDeclaration>): 
                         Map<string,
                         SetFont<Partial<CSSStyleDeclaration>>> {
        const ef = new Map();
        ef.set('apply', new ApplyFont(style));
        return ef;
    }

}