import { ParamConstraint } from './param-constraint';
import { SetLayoutConstraint } from './set-layout-constraint';

export class BottomConstraint<T extends Partial<CSSStyleDeclaration>>
       implements SetLayoutConstraint<T> {

    public style: T;

    constructor(style: T) {
        this.style = style;
    }
    
    public set(cp: ParamConstraint<T>) {
        if (cp.bound) {
            this.style.height = cp.bound.height + 'px';
            this.style.marginTop = cp.bound.top + 'px';
            this.style.marginBottom = cp.bound.bottom + 'px';
            this.style.minHeight = this.style.height;
            this.style.height = undefined;
        }
    }
}