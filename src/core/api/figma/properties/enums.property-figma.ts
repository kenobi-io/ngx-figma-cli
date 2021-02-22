/** A string enum with value, describing the end caps of vector paths. */
export enum StrokeCapEnum {
    NONE = 'NONE',
    ROUND = 'ROUND',
    SQUARE = 'SQUARE',
    LINE_ARROW = 'LINE_ARROW',
    TRIANGLE_ARROW = 'TRIANGLE_ARROW',
}

export enum NodeTypeEnum {
    FRAME = 'FRAME',
    RECTANGLE = 'RECTANGLE',
    INSTANCE = 'INSTANCE',
    COMPONENT = 'COMPONENT',
    DOCUMENT = 'DOCUMENT',
    CANVAS = 'CANVAS',
    GROUP = 'GROUP',
    VECTOR = 'VECTOR',
    BOOLEAN_OPERATION = 'BOOLEAN_OPERATION',
    STAR = 'STAR',
    LINE = 'LINE',
    ELLIPSE = 'ELLIPSE',
    REGULAR_POLYGON = 'REGULAR_POLYGON',
    TEXT = 'TEXT',
    SLICE = 'SLICE'
}

/** Where stroke is drawn relative to the vector outline as a string enum */
export enum StrokeAlignEnum {
    INSIDE = 'INSIDE',
    OUTSIDE = 'OUTSIDE',
    CENTER = 'CENTER',
}

/** A string enum with value, describing how corners in vector paths are rendered. */
export enum StrokeJoinEnum {
    MITER = 'MITER',
    BEVEL = 'BEVEL',
    ROUND = 'ROUND',
}

export enum ImageEnum {
    JPG = 'JPG',
    PNG = 'PNG',
    SVG = 'SVG',
}

/** A string enum with value, indicating the type of boolean operation applied */
export enum BooleanOperationEnum {
    UNION = 'UNION',
    INTERSECT = 'INTERSECT',
    SUBTRACT = 'SUBTRACT',
    EXCLUDE = 'EXCLUDE',
}

/** Text casing applied to the node, default is the original casing */
export enum TextCaseEnum {
    ORIGINAL = 'ORIGINAL',
    UPPER = 'UPPER',
    LOWER = 'LOWER',
    TITLE = 'TITLE',
}

/** Text decoration applied to the node */
export enum TextDecorationEnum {
    NONE = 'NONE',
    STRIKETHROUGH = 'STRIKETHROUGH',
    UNDERLINE = 'UNDERLINE',
}

/** The unit of the line height value specified by the user. */
export enum LineHeightUnitEnum {
    PIXELS = 'PIXELS',
    'FONT_SIZE_%' = 'FONT_SIZE_%',
    'INTRINSIC_%' = 'INTRINSIC_%',
}

/**
 * This type is a string enum with the following possible values  
 * Normal blends:  
 * "PASS_THROUGH" (Only applicable to objects with children)  
 * "NORMAL"  
 *   
 * Darken:  
 * "DARKEN"  
 * "MULTIPLY"  
 * "LINEAR_BURN"  
 * "COLOR_BURN"  
 *   
 * Lighten:  
 * "LIGHTEN"  
 * "SCREEN"  
 * "LINEAR_DODGE"  
 * "COLOR_DODGE"  
 *   
 * Contrast:  
 * "OVERLAY"  
 * "SOFT_LIGHT"  
 * "HARD_LIGHT"  
 *   
 * Inversion:  
 * "DIFFERENCE"  
 * "EXCLUSION"  
 *   
 * Component:  
 * "HUE"  
 * "SATURATION"  
 * "COLOR"  
 * "LUMINOSITY"  
 */
export enum BlendModeEnum {
    // Normal blends:
    /** (Only applicable to objects with children) */
    PASS_THROUGH = "PASS_THROUGH",
    /** (Only applicable to objects with children) */
    NORMAL = "NORMAL",

    /** Darken */
    DARKEN = "DARKEN",
    MULTIPLY = "MULTIPLY",
    LINEAR_BURN = "LINEAR_BURN",
    COLOR_BURN = "COLOR_BURN",

    /** Lighten */
    LIGHTEN = "LIGHTEN",
    SCREEN = "SCREEN",
    LINEAR_DODGE = "LINEAR_DODGE",
    COLOR_DODGE = "COLOR_DODGE",

    /** Contrast */
    OVERLAY = "OVERLAY",
    SOFT_LIGHT = "SOFT_LIGHT",
    HARD_LIGHT = "HARD_LIGHT",

    /** Inversion */
    DIFFERENCE = "DIFFERENCE",
    EXCLUSION = "EXCLUSION",

    /** Component */
    HUE = "HUE",
    SATURATION = "SATURATION",
    COLOR = "COLOR",
    LUMINOSITY = "LUMINOSITY",
}

/**
 * Enum describing animation easing curves  
 * This type is a string enum with the following possible values  
 * "EASE_IN": Ease in with an animation curve similar to CSS ease-in.  
 * "EASE_OUT": Ease out with an animation curve similar to CSS ease-out.  
 * "EASE_IN_AND_OUT": Ease in and then out with an animation curve similar to CSS ease-in-out.  
 */
export enum EasingTypeEnum {
    /** Ease in with an animation curve similar to CSS ease-in. */
    EASE_IN = 'EASE_IN',
    /** Ease out with an animation curve similar to CSS ease-out. */
    EASE_OUT = 'EASE_OUT',
    /** Ease in and then out with an animation curve similar to CSS ease-in-out. */
    EASE_IN_AND_OUT = 'EASE_IN_AND_OUT',
    LINEAR = 'LINEAR',
}

export enum LayoutConstraint {
    TOP = 'TOP',
    BOTTOM = 'BOTTOM',
    TOP_BOTTOM = 'TOP_BOTTOM',
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
    CENTER = 'CENTER',
    LEFT_RIGHT = 'LEFT_RIGHT',
    SCALE = 'SCALE',
}

export enum LayoutGridPatternEnum {
    COLUMNS = 'COLUMNS',
    ROWS = 'ROWS',
    GRID = 'GRID',
}

export enum LayoutGridAligmentEnum {
    MIN = 'MIN',
    MAX = 'MAX',
    CENTER = 'CENTER',
}

export enum PathWindingRuleEnum {
    EVENODD = 'EVENODD',
    NONZERO = 'NONZERO',
}

export enum EffectEnum {
    INNER_SHADOW = 'INNER_SHADOW',
    DROP_SHADOW = 'DROP_SHADOW',
    LAYER_BLUR = 'LAYER_BLUR',
    BACKGROUND_BLUR = 'BACKGROUND_BLUR',
}

export enum TypePaintEnum {
    SOLID = 'SOLID',
    GRADIENT_LINEAR = 'GRADIENT_LINEAR',
    GRADIENT_RADIAL = 'GRADIENT_RADIAL',
    GRADIENT_ANGULAR = 'GRADIENT_ANGULAR',
    GRADIENT_DIAMOND = 'GRADIENT_DIAMOND',
    IMAGE = 'IMAGE',
    EMOJI = 'EMOJI',
}

export enum ScaleModePaintEnum {
    FILL = 'FILL',
    FIT = 'FIT',
    TILE = 'TILE',
    STRETCH = 'STRETCH',
}

export enum ConstrainTypeEnum {
    /** Scale by value */
    SCALE = 'SCALE',
    /** Scale proportionally and set width to value */
    WIDTH = 'WIDTH',
    /** Scale proportionally and set width to value */
    HEIGHT = 'HEIGHT',
}

export enum StyleTypeEnum {
    FILL = 'FILL',
    TEXT = 'TEXT',
    EFFECT = 'EFFECT',
    GRID = 'GRID'
}
