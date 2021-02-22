import { Style } from '../style';
import { SetEffect } from './set-effect';
import { ParamEffect } from './param-effect';


export class DropShadowEffect<T extends Partial<Style>> 
       implements SetEffect<T> {

    public style: T;

    constructor(style: T) {
        this.style = style;
    }
    
    public set(pf: ParamEffect) {
        if (this.style.dropShadow) {
            this.style.boxShadow = this.style.dropShadow(pf.effect);
        }
    }
}
