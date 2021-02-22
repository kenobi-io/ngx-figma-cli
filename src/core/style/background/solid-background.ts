import { SetBackground } from './set-background';
import { ParamBackground } from './param-background';
import { Style } from '../style';


export class ImageBackground<T extends Partial<Style>>
    implements SetBackground<T> {

    public style: T;

    constructor(style: T) {
        this.style = style;
    }

    public set(cb: ParamBackground) {
        if (this.style.colorToString) {
            this.style.backgroundColor = this.style.colorToString(cb.lastFill.color);
            this.style.opacity = `${cb.lastFill.opacity}`;
        }
    }
}
