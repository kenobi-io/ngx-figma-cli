// import { LayoutConstraintVerticalEnum, LayoutConstraintHorizontalEnum } from "./enums.property-figma";
import { LayoutConstraints } from "./enums.property-figma";
export interface LayoutConstraintPropertyFigma {
    // /**
    // * Vertical constraint as an enum
    // * "TOP": Node is laid out relative to top of the containing frame
    // * "BOTTOM": Node is laid out relative to bottom of the containing frame
    // * "CENTER": Node is vertically centered relative to containing frame
    // * "TOP_BOTTOM": Both top and bottom of node are constrained relative to containing frame (node stretches with frame)
    // * "SCALE": Node scales vertically with containing frame
    // */
    // vertical: LayoutConstraintVerticalEnum;
    // /**
    //  * Horizontal constraint as an enum
    //  * "LEFT": Node is laid out relative to left of the containing frame
    //  * "RIGHT": Node is laid out relative to right of the containing frame
    //  * "CENTER": Node is horizontally centered relative to containing frame
    //  * "LEFT_RIGHT": Both left and right of node are constrained relative to containing frame (node stretches with frame)
    //  * "SCALE": Node scales horizontally with containing frame
    //  */
    // horizontal: LayoutConstraintHorizontalEnum;
    constraint: LayoutConstraints;
}
