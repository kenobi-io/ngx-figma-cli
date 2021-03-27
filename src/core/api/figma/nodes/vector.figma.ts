import {
    ExportSettingPropertyFigma,
    BlendModes,
    LayoutConstraintPropertyFigma,
    EasingTypes,
    RectanglePropertyFigma,
    VectorPropertyFigma,
    TransformPropertyFigma,
    EffectPropertyFigma,
    PaintPropertyFigma,
    PathPropertyFigma,
    StrokeCaps,
    StrokeAligns,
    StrokeJoins,
    StyleTypes
} from "../properties/properties";

/** A vector network, consisting of vertices and edges */
export interface VectorFigma {
    /** default: [] An array of export settings representing images to export from node */
    exportSettings: ExportSettingPropertyFigma[];
    /** If true, layer is locked and cannot be edited, default `false` */
    locked?: boolean;
    /** How this node blends with nodes behind it in the scene (see blend mode section for more details) */
    blendMode: BlendModes;
    /** default: false Keep height and width constrained to same ratio */
    preserveRatio?: boolean;
    /** Horizontal and vertical layout constraints for node */
    constraints: LayoutConstraintPropertyFigma;
    /** default: null Node ID of node to transition to in prototyping */
    transitionNodeID?: string | null;
    /** default: null The duration of the prototyping transition on this node (in milliseconds). */
    transitionDuration?: number | null;
    /** default: null The easing curve used in the prototyping transition on this node. */
    transitionEasing?: EasingTypes | null;
    /** default: 1 Opacity of the node */
    opacity?: number;
    /** Bounding box of the node in absolute space coordinates */
    absoluteBoundingBox: RectanglePropertyFigma;
    /** Width and height of element. This is different from the width and height
     *  of the bounding box in that the absolute bounding box represents the element
     *  after scaling and rotation. Only present if geometry=paths is passed */
    size?: VectorPropertyFigma;
    /** The top two rows of a matrix that represents the 2D transform of this node relative
     *  to its parent. The bottom row of the matrix is implicitly always (0, 0, 1).
     * Use to transform coordinates in geometry. Only present if geometry=paths is passed */
    relativeTransform?: TransformPropertyFigma;
    /** default: [] An array of effects attached to this node (see effects section for more details) */
    effects?: EffectPropertyFigma[];
    /** default: false Does this node mask sibling nodes in front of it? */
    isMask?: boolean;
    /** default: [] An array of fill paints applied to the node */
    fills: PaintPropertyFigma[];
    /** Only specified if parameter geometry=paths is used.
     * An array of paths representing the object fill */
    fillGeometry?: PathPropertyFigma[];
    /** default: [] An array of stroke paints applied to the node */
    strokes: PaintPropertyFigma[];
    /** The weight of strokes on the node */
    strokeWeight: number;
    strokeCap?: StrokeCaps;
    /** Only specified if parameter geometry=paths is used. An array of paths representing the object stroke */
    strokeGeometry?: PathPropertyFigma[];
    /** Where stroke is drawn relative to the vector outline as a string enum
    "INSIDE": draw stroke inside the shape boundary
    "OUTSIDE": draw stroke outside the shape boundary
    "CENTER": draw stroke centered along the shape boundary */
    strokeAlign: StrokeAligns
    /** A string enum with value of "MITER", "BEVEL", or "ROUND", describing
     * how corners in vector paths are rendered. */
    strokeJoin?: StrokeJoins;
    /** An array of floating point numbers describing the pattern of dash length and
     *  gap lengths that the vector path follows. For example a value of [1, 2]
     * indicates that the path has a dash of length 1 followed by a gap of length 2, repeated. */
    strokeDashes?: number[];
    /** Only valid if strokeJoin is "MITER". The corner angle, in degrees,
     * below which strokeJoin will be set to "BEVEL" to avoid super sharp corners.
     *  By default this is 28.96 degrees. */
    strokeMiterAngle?: number;
    /** A mapping of a StyleType to style ID (see Style) of styles present on this node.
     *  The style ID can be used to look up more information about the style in the top-level styles field. */
    styles?: Map<StyleTypes, string>;
}

/** A regular star shape */
export interface StarFigma extends VectorFigma {}

/** A straight line */
export interface LineFigma extends VectorFigma {}

/** An ellipse */
export interface EllipseFigma extends VectorFigma {}

/** A regular n-sided polygon */
export interface RegularPolygonFigma extends VectorFigma {}
