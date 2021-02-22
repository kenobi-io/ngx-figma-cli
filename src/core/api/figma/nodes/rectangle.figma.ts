import { VectorFigma } from "./vector.figma";
/** A rectangle */
export interface RectangleFigma extends VectorFigma {
    /** Radius of each corner of the rectangle */
    cornerRadius: number;
    /** Array of length 4 of the radius of each corner of the rectangle, starting in the top left and proceeding clockwise */
    rectangleCornerRadii: [number, number, number, number];
}
