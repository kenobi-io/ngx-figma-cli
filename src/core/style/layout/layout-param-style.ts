import { ParamStyle } from "../param-style";
import { Style } from "../style";

export interface LayoutParamStyle extends ParamStyle {
    value: Style;
    outerStyle: Style;
    outerClass: string;
    isVertical: boolean;
}