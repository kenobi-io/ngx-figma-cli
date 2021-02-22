import { Style } from '../style';
import { SetEffect } from './set-effect';
import { ParamEffect } from './param-effect';


export class LayerBlurEffect<T extends Partial<CSSStyleDeclaration>> 
       implements SetEffect<T> {

    public style: T;

    constructor(style: T) {
        this.style = style;
    }
    
    public set(pf: ParamEffect) {
        this.style.filter = `blur(${pf.effect.radius}px)`;
    }
}
