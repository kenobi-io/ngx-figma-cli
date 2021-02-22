import { ParamConstraint } from './param-constraint';
import { SetLayoutConstraint } from './set-layout-constraint';

export class RightConstraint<T extends Partial<CSSStyleDeclaration>> 
       implements SetLayoutConstraint<T> {

    public style: T;

    constructor(style: T) {
        this.style = style;
    }
    
    public set(cp: ParamConstraint<T>) {
        cp.outerClass += ' centerer';
        if (cp.bound) {
            this.style.marginTop = cp.bound.top + 'px';
            this.style.marginBottom = cp.bound.bottom + 'px';
        }
    }
}