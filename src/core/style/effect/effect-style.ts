import { SetEffect } from './set-effect';
import { ParamEffect } from './param-effect';

export class EffectStyle<T extends Partial<CSSStyleDeclaration>> {

    public style: T;

    constructor(style: T) {
        this.style = style;
    }

    public set(setEffect: SetEffect<T> | undefined,
               paramEffect: ParamEffect): void {
        if (setEffect) {
            setEffect.set(paramEffect);
        } else {
            throw new Error("setEffect is undefined | null");
        }
    }   
}
