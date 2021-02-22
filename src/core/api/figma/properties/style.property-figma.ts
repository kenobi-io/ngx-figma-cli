import { StyleTypeEnum } from "./enums.property-figma";

/** A set of properties that can be applied to nodes and published. Styles for a property can be created in the corresponding property's panel while editing a file */
export interface StylePropertyFigma {
    /** The key of the style */
    key: string;
    /** The name of the style */
    name: string;
    /** The type of style */
    style_type: StyleTypeEnum;
}
