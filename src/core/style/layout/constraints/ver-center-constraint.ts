import { ParamConstraint } from './param-constraint';
import { SetLayoutConstraint } from './set-layout-constraint';

export class VerCenterConstraint<T extends Partial<CSSStyleDeclaration>>
       implements SetLayoutConstraint<T> {

    public style: T;

    constructor(style: T) {
        this.style = style;
    }
    
    public set(cp: ParamConstraint<T>) {
        cp.outerClass += ' centerer';
        cp.outerStyle.alignItems = 'center';

        if (cp.bound 
            && cp.bound.top 
            && cp.bound.height
            && cp.bound.bottom) {
            this.style.height = cp.bound.height + 'px';
            this.style.marginTop = `${Number.parseFloat(cp.bound.top) - Number.parseFloat(cp.bound.bottom)}`;
            this.style.marginTop += 'px';;
        }
    }
}