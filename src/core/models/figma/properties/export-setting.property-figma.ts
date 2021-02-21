import { ImageEnum } from "./enums.property-figma";
import { ConstraintPropertyFigma } from "./constraint.property-figma";
/** Format and size to export an asset at */
export interface ExportSettingPropertyFigma {
    /** File suffix to append to all filenames */
    suffix: string;
    /** Image type, string enum that supports values "JPG", "PNG", and "SVG" */
    format: ImageEnum;
    /** Constraint that determines sizing of exported asset */
    constraint: ConstraintPropertyFigma;
}
