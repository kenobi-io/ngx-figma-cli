import {
    ExportSettingPropertyFigma,
    RectanglePropertyFigma,
    VectorPropertyFigma,
    TransformPropertyFigma
} from "../properties/properties";

/** A rectangular region of the canvas that can be exported */
export interface SliceFigma {
    /** An array of export settings representing images to export from this node */
    exportSettings: ExportSettingPropertyFigma[];
    /** Bounding box of the node in absolute space coordinates */
    absoluteBoundingBox: RectanglePropertyFigma;
    /** Width and height of element. This is different from the width and height of the bounding box in that the absolute bounding box represents the element after scaling and rotation. Only present if geometry=paths is passed */
    size?: VectorPropertyFigma;
    /** The top two rows of a matrix that represents the 2D transform of this node relative to its parent. The bottom row of the matrix is implicitly always (0, 0, 1). Use to transform coordinates in geometry. Only present if geometry=paths is passed */
    relativeTransform?: TransformPropertyFigma;
}
