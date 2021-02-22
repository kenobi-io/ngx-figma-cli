import { ParamConstraint } from './param-constraint';
import { SetLayoutConstraint } from './set-layout-constraint';

export class CenterConstraint<T extends Partial<CSSStyleDeclaration>> 
       implements SetLayoutConstraint<T> {

    public style: T;

    constructor(style: T) {
        this.style = style;
    }
    
    public set(cp: ParamConstraint<T>) {
        cp.outerStyle.justifyContent = 'center';
        if (cp.bound) {
            this.style.width = cp.bound.width + 'px';
            this.style.marginLeft = cp.bound.left && cp.bound.right ? 
                    `${Number.parseFloat(cp.bound.left) - Number.parseFloat(cp.bound.right)}` : undefined;
            this.style.marginLeft += 'px';
        }
    }
}