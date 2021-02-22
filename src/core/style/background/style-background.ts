import { SetBackground } from './set-background';
import { ParamBackground } from './param-background';

export class StyleBackground<T extends Partial<CSSStyleDeclaration>> {

    public style: T;

    constructor(style: T) {
        this.style = style;
    }

    public constraint(setBackground: SetBackground<T> | undefined,
                      paramBackground: ParamBackground): void {

        if (setBackground) {
            setBackground.set(paramBackground);
        } else {
            throw new Error("setBackground is undefined | null");
        }
    }   
}
