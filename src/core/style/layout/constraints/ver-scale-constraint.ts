import { ParamConstraint } from './param-constraint';
import { SetLayoutConstraint } from './set-layout-constraint';

export class VerScaleConstraint<T extends Partial<CSSStyleDeclaration>> 
       implements SetLayoutConstraint<T> {

    public style: T;

    constructor(style: T) {
        this.style = style;
    }
    
    public set(cp: ParamConstraint<T>) {
        cp.outerClass += ' centerer';

        if (cp.bound 
            && cp.bound.top 
            && cp.bound.height
            && cp.bound.bottom) {
            this.style.height = cp.bound.height + 'px';
            const parentHeight = Number.parseFloat(cp.bound.top) +
                                 Number.parseFloat(cp.bound.height) + 
                                 Number.parseFloat(cp.bound.bottom);
            cp.bound.top + cp.bound.height + cp.bound.bottom;
            this.style.height = `${Number.parseFloat(cp.bound.height) * 100 / parentHeight}%`;
            this.style.top = `${Number.parseFloat(cp.bound.top) * 100 / parentHeight}%`;
        }
    }
}