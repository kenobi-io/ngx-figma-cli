import { DocumentFigma } from "./document.figma";
import { CanvasFigma } from "./canvas.figma";
import { ComponentFigma, FrameFigma, GroupFigma } from "./frame.figma";
import {
    EllipseFigma,
    LineFigma,
    RegularPolygonFigma,
    StarFigma,
    VectorFigma
} from "./vector.figma";
import { BooleanOperationFigma } from "./boolean-operation.figma";
import { RectangleFigma } from "./rectangle.figma";
import { TextFigma } from "./text.figma";
import { SliceFigma } from "./slice.figma";
import { InstanceFigma } from "./instance.figma";

export interface NodeTypesFigma {
    /** The root node */
    DOCUMENT: DocumentFigma;
    /** Represents a single page */
    CANVAS: CanvasFigma;
    /** A node of fixed size containing other nodes */
    FRAME: FrameFigma;
    /** A logical grouping of nodes */
    GROUP: GroupFigma;
    /** A vector network, consisting of vertices and edges */
    VECTOR: VectorFigma;
    BOOLEAN_OPERATION: BooleanOperationFigma;
    /** A regular star shape */
    STAR: StarFigma;
    /** A straight line */
    LINE: LineFigma;
    /** An ellipse */
    ELLIPSE: EllipseFigma;
    /** A regular n-sided polygon */
    REGULAR_POLYGON: RegularPolygonFigma;
    /** A rectangle */
    RECTANGLE: RectangleFigma;
    /** A text box */
    TEXT: TextFigma;
    /** A rectangular region of the canvas that can be exported */
    SLICE: SliceFigma;
    /** A node that can have instances created of it that share the same properties */
    COMPONENT: ComponentFigma;
    /** An instance of a component, changes to the component result in the same changes applied to the instance */
    INSTANCE: InstanceFigma;
}
