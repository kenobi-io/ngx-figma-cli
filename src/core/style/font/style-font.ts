import { SetFont } from './set-font';
import { ParamFont } from './param-font';

export class StyleFont<T extends Partial<CSSStyleDeclaration>> {

    public style: T;

    constructor(style: T) {
        this.style = style;
    }

    public set(setFont: SetFont<T> | undefined,
               paramFont: ParamFont): void {
        if (setFont) {
            setFont.set(paramFont);
        } else {
            throw new Error("setFont is undefined | null");
        }
    }   
}
