import { LayoutGridPatterns, LayoutGridAligments } from "./enums.property-figma";
import { ColorPropertyFigma } from "./color.property-figma";
/** Guides to align and place objects within a frame */
export interface LayoutGridPropertyFigma {
    /**
     * Orientation of the grid as a string enum
     * "COLUMNS": Vertical grid
     * "ROWS": Horizontal grid
     * "GRID": Square grid
     */
    pattern: LayoutGridPatterns;
    /** Width of column grid or height of row grid or square grid spacing */
    sectionSize: number;
    /** Is the grid currently visible? */
    visible: boolean;
    /** Color of the grid */
    color: ColorPropertyFigma;
    // The following properties are only meaningful for directional grids (COLUMNS or ROWS)
    /**
     * Positioning of grid as a string enum
     * "MIN": Grid starts at the left or top of the frame
     * "MAX": Grid starts at the right or bottom of the frame
     * "CENTER": Grid is center aligned
     */
    alignment: LayoutGridAligments;
    /** Spacing in between columns and rows */
    gutterSize: number;
    /** Spacing before the first column or row */
    offset: number;
    /** Number of columns or rows */
    count: number;
}
