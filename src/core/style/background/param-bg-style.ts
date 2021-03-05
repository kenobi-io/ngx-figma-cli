import {
    ComponentFigma,
    FrameFigma,
    InstanceFigma,
    RectangleFigma
} from "../../api";
import { ParamStyle } from "../param-style";

export interface BackgroundParamStyle extends ParamStyle {
    value: FrameFigma | ComponentFigma | InstanceFigma | RectangleFigma;
}