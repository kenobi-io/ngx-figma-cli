import { ParamConstraint } from './param-constraint';
import { SetLayoutConstraint } from './set-layout-constraint';

export class ScaleConstraint<T extends Partial<CSSStyleDeclaration>>
       implements SetLayoutConstraint<T> {

    public style: T;

    constructor(style: T) {
        this.style = style;
    }
    
    public set(cp: ParamConstraint<T>) {

        if (cp.bound 
            && cp.bound.left 
            && cp.bound.width
            && cp.bound.right) {
            const parentWidth = Number.parseFloat(cp.bound.left) +
                                Number.parseFloat(cp.bound.width) + 
                                Number.parseFloat(cp.bound.right);
            this.style.width = `${Number.parseFloat(cp.bound.width) * 100 / parentWidth}%`;
            this.style.marginLeft = `${Number.parseFloat(cp.bound.left)* 100 / parentWidth}%`;
        }
    }
}