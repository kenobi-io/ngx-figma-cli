import { NodeFigma } from "./node.figma";
import {
    ColorPropertyFigma,
    ExportSettingPropertyFigma,
    BlendModeEnum,
    LayoutConstraintPropertyFigma,
    PaintPropertyFigma,
    EasingTypeEnum,
    RectanglePropertyFigma,
    VectorPropertyFigma,
    TransformPropertyFigma,
    LayoutGridPropertyFigma,
    EffectPropertyFigma,
    PathPropertyFigma,
    StrokeAlignEnum,
    StrokeCapEnum,
    StrokeJoinEnum
} from "../properties/properties";
/** A node of fixed size containing other nodes */
export interface FrameFigma {
    /** An array of nodes that are direct children of this node */
    children: NodeFigma[];
    /** If true, layer is locked and cannot be edited, default `false` */
    locked?: boolean;
    /** Background of the node */
    background: PaintPropertyFigma[];
    /** Background color of the node. This is deprecated,
     *  as frames now support more than a solid color as a background.
     *  Please use the background field instead. */
    backgroundColor?: ColorPropertyFigma;
    /** default: [] An array of export settings representing images to export from node */
    exportSettings: ExportSettingPropertyFigma[];
    /** How this node blends with nodes behind it in the scene (see blend mode section for more details) */
    blendMode: BlendModeEnum;
    /** default: false Keep height and width constrained to same ratio */
    preserveRatio: boolean;
    /** Horizontal and vertical layout constraints for node */
    constraints: LayoutConstraintPropertyFigma;
    /** default: null Node ID of node to transition to in prototyping */
    transitionNodeID?: string | null;
    /** default: null The duration of the prototyping transition on this node (in milliseconds). */
    transitionDuration?: number | null;
    /** default: null The easing curve used in the prototyping transition on this node. */
    transitionEasing?: EasingTypeEnum | null;
    /** default: 1 Opacity of the node */
    opacity: number;
    /** Bounding box of the node in absolute space coordinates */
    absoluteBoundingBox: RectanglePropertyFigma;
    /** Width and height of element. This is different from the width and height of the bounding box in that the absolute bounding box represents the element after scaling and rotation. Only present if geometry=paths is passed */
    size?: VectorPropertyFigma;
    /** The top two rows of a matrix that represents the 2D transform of this node relative to its parent. The bottom row of the matrix is implicitly always (0, 0, 1). Use to transform coordinates in geometry. Only present if geometry=paths is passed */
    relativeTransform?: TransformPropertyFigma;
    /** Does this node clip content outside of its bounds? */
    clipsContent: boolean;
    /** default: [] An array of layout grids attached to this node (see layout grids section for more details). GROUP nodes do not have this attribute */
    layoutGrids?: LayoutGridPropertyFigma[];
    /** default: [] An array of effects attached to this node (see effects section for more details) */
    effects: EffectPropertyFigma[];
    /** default: false Does this node mask sibling nodes in front of it? */
    isMask: boolean;
    /** default: false Does this mask ignore fill style (like gradients) and effects? */
    isMaskOutline: boolean;

    strokes: PaintPropertyFigma[];
    /** The weight of strokes on the node */
    strokeWeight: number;
    strokeCap?: StrokeCapEnum;
    /** Only specified if parameter geometry=paths is used. An array of paths representing the object stroke */
    strokeGeometry?: PathPropertyFigma[];
    /** Where stroke is drawn relative to the vector outline as a string enum
    "INSIDE": draw stroke inside the shape boundary
    "OUTSIDE": draw stroke outside the shape boundary
    "CENTER": draw stroke centered along the shape boundary */
    strokeAlign: StrokeAlignEnum
    /** A string enum with value of "MITER", "BEVEL", or "ROUND", describing
     * how corners in vector paths are rendered. */
    strokeJoin?: StrokeJoinEnum;
    /** An array of floating point numbers describing the pattern of dash length and
     *  gap lengths that the vector path follows. For example a value of [1, 2]
     * indicates that the path has a dash of length 1 followed by a gap of length 2, repeated. */
    strokeDashes?: number[];
    /** Only valid if strokeJoin is "MITER". The corner angle, in degrees,
     * below which strokeJoin will be set to "BEVEL" to avoid super sharp corners.
     *  By default this is 28.96 degrees. */
    strokeMiterAngle?: number;
}


/** A logical grouping of nodes */
export interface GroupFigma extends FrameFigma {}
/** A node that can have instances created of it that share the same properties */
export interface ComponentFigma extends FrameFigma {}