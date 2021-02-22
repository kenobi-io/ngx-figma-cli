import { ConstrainTypeEnum } from "./enums.property-figma";
/** Sizing constraint for exports */
export interface ConstraintPropertyFigma {
    /**
     * Type of constraint to apply; string enum with potential values below
     * "SCALE": Scale by value
     * "WIDTH": Scale proportionally and set width to value
     * "HEIGHT": Scale proportionally and set height to value
     */
    type: ConstrainTypeEnum;
    /** See type property for effect of this field */
    value: number;
}
