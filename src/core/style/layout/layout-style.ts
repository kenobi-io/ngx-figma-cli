import { ParamConstraint } from "./constraints/param-constraint";
import { SetLayoutConstraint } from "./constraints/set-layout-constraint";

export class LayoutStyle<T extends Partial<CSSStyleDeclaration>> {

    public style: T;

    constructor(style: T) {
        this.style = style;
    }

    public constraint(setLayoutConstraint: SetLayoutConstraint<T> | undefined,
                      constraintParam: ParamConstraint<T>): void {
        if (setLayoutConstraint) {
            setLayoutConstraint.set(constraintParam);
        } else {
            throw new Error("setLayoutConstraint is undefined | null");
        }
    }   
}
