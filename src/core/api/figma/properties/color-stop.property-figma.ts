import { ColorPropertyFigma } from "./color.property-figma";
/** A position color pair representing a gradient stop */
export interface ColorStopPropertyFigma {
    /** Value between 0 and 1 representing position along gradient axis */
    position: number;
    /** Color attached to corresponding position */
    color: ColorPropertyFigma;
}
