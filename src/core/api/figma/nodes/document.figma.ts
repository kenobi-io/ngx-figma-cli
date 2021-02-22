import { NodeTypeEnum } from "../properties/properties";
import { NodeFigma } from "./node.figma";
/** The root node  Figma*/
export interface DocumentFigma {
    id: string,
    name: string,
    type: NodeTypeEnum,
    /** An array of canvases attached to the document */
    children: NodeFigma[];
}
