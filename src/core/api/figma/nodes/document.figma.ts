import { NodeTypes } from "../properties/properties";
/** The root node  Figma*/
export interface DocumentFigma {
    id: string,
    name: string,
    type: NodeTypes,
    /** An array of canvases attached to the document */
    children: any[];
}
