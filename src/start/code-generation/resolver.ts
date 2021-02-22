import { SetBackground } from '../../core/style/background/set-background';
import { 
    BottomConstraint,
    CenterConstraint,
    LayoutConstraint, 
    LeftConstraint, 
    LeftRightConstraint, 
    RightConstraint, 
    ScaleConstraint, 
    SetLayoutConstraint, 
    TypePaintEnum
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
        bg.set(LayoutConstraint.LEFT_RIGHT,
            new LeftRightConstraint(style));
        bg.set(LayoutConstraint.LEFT,
            new LeftConstraint(style));
        bg.set(LayoutConstraint.RIGHT,
            new RightConstraint(style));
        bg.set(LayoutConstraint.SCALE,
            new ScaleConstraint(style));
        return bg;
    }

}