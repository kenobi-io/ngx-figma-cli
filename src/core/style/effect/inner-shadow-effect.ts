import { Style } from '../style';
import { SetEffect } from './set-effect';
import { ParamEffect } from './param-effect';


export class InnerShadowEffect<T extends Partial<Style>> 
       implements SetEffect<T> {

    public style: T;

    constructor(style: T) {
        this.style = style;
    }
    
    public set(pe: ParamEffect) {
        if (this.style.innerShadow) {
            this.style.boxShadow = this.style.innerShadow(pe.effect);
        }
    }
}
