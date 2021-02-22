import { SetFont } from './set-font';
import { ParamFont } from './param-font';

export class ApplyFont<T extends Partial<CSSStyleDeclaration>> 
       implements SetFont<T> {

    public style: T;

    constructor(style: T) {
        this.style = style;
    }
    
    public set(pf: ParamFont) {
        this.style.fontSize = pf.fontSize + 'px';
        this.style.fontWeight = pf.fontWeight;
        this.style.fontFamily = pf.fontFamily;
        this.style.textAlign = pf.textAlignHorizontal;
        this.style.fontStyle = pf.italic ? 'italic' : 'normal';
        this.style.lineHeight = `${pf.lineHeightPercent * 1.25}%`;
        this.style.letterSpacing = `${pf.letterSpacing}px`;
    }
}
