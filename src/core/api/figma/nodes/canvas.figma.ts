import { NodeFigma } from "./node.figma";
import { ExportSettingPropertyFigma, ColorPropertyFigma } from "../properties/properties";
/** Represents a single page */
export interface CanvasFigma {
    /** An array of top level layers on the canvas */
    children: NodeFigma[];
    /** Background color of the canvas */
    backgroundColor: ColorPropertyFigma;
    /** default: [] An array of export settings representing images to export from the canvas */
    exportSettings: ExportSettingPropertyFigma[];
    /** Node ID that corresponds to the start frame for prototypes */
    prototypeStartNodeID?: string | null;
}
