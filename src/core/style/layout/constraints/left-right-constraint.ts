import { ParamConstraint } from './param-constraint';
import { SetLayoutConstraint } from './set-layout-constraint';

export class LeftRightConstraint<T extends Partial<CSSStyleDeclaration>> 
       implements SetLayoutConstraint<T> {

    public style: T;

    constructor(style: T) {
        this.style = style;
    }
    
    public set(cp: ParamConstraint<T>): void {
        if (cp.bound) {
            this.style.marginLeft = cp.bound.left + 'px';
            this.style.marginRight = cp.bound.right + 'px';
            this.style.flexGrow = '1';
        }
    }
}