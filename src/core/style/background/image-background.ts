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
        if (this.style.imageUrl && this.style.backgroundSizeIsFill) {
            this.style.backgroundImage = this.style.imageUrl(cb.lastFill.imageRef);
            this.style.backgroundSize = this.style.backgroundSizeIsFill(cb.lastFill.scaleMode);
        }
    }
}
