import { VectorFigma } from "./vector.figma";
import { BooleanOperationEnum } from "../properties/properties";
/** A group that has a boolean operation applied to it */
export interface BooleanOperationFigma extends VectorFigma {
    /** An array of nodes that are being boolean operated on */
    children: Node[];
    /** A string enum with value of
     * "UNION", "INTERSECT", "SUBTRACT",
     * or "EXCLUDE" indicating the type of boolean operation applied */
    booleanOperation: BooleanOperationEnum;
}
