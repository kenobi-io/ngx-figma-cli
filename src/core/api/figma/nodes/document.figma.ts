import { NodeTypeEnum } from "../properties/properties";
/** The root node  Figma*/
export interface DocumentFigma {
    id: string,
    name: string,
    type: NodeTypeEnum,
    /** An array of canvases attached to the document */
    children: any[];
}
