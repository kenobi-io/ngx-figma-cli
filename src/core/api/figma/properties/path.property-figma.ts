import { PathWindingRules } from "./enums.property-figma";

/** A vector svg path */
export interface PathPropertyFigma {
    /** A sequence of path commands in SVG notation */
    path: string,
    /** Winding rule for the path, either "EVENODD" or "NONZERO" */
    windingRule: PathWindingRules,
}