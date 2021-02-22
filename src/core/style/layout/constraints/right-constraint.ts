import { ParamConstraint } from './param-constraint';
import { SetLayoutConstraint } from './set-layout-constraint';

export class RightConstraint<T extends Partial<CSSStyleDeclaration>> 
       implements SetLayoutConstraint<T> {

    public style: T;

    constructor(style: T) {
        this.style = style;
    }
    
    public set(cp: ParamConstraint<T>) {
        cp.outerStyle.justifyContent = 'flex-end';
        if (cp.bound) {
            this.style.marginRight = cp.bound.right + 'px';
            this.style.width = cp.bound.width + 'px';
            this.style.minWidth = cp.bound.width + 'px';
        }
    }
}
