import { ParamConstraint } from './param-constraint';
import { SetLayoutConstraint } from './set-layout-constraint';

export class LeftConstraint<T extends Partial<CSSStyleDeclaration>> 
       implements SetLayoutConstraint<T> {

    public style: T;

    constructor(style: T) {
        this.style = style;
    }
    
    public set(cp: ParamConstraint<T>) {
        if (cp.bound) {
            this.style.marginLeft = cp.bound.left + 'px';
            this.style.width = cp.bound.width + 'px';
            this.style.minWidth = cp.bound.width + 'px';
        }
    }
}