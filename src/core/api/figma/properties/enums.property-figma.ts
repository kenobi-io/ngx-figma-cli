/** A string enum with value, describing the end caps of vector paths. */
export enum StrokeCaps {
  NONE = 'NONE',
  ROUND = 'ROUND',
  SQUARE = 'SQUARE',
  LINE_ARROW = 'LINE_ARROW',
  TRIANGLE_ARROW = 'TRIANGLE_ARROW',
}

export enum Nodes {
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
  SLICE = 'SLICE',
}

export enum Groups {
  GROUP = 'GROUP',
  BOOLEAN_OPERATION = 'BOOLEAN_OPERATION',
}

export enum Vectors {
  VECTOR = 'VECTOR',
  LINE = 'LINE',
  REGULAR_POLYGON = 'REGULAR_POLYGON',
  ELLIPSE = 'ELLIPSE',
  STAR = 'STAR',
}

export enum Characters {
  HASH = 'HASH',
  PARENT_START = 'PARENT_START',
  PARENT_END = 'PARENT_END',
  DEFAULT = 'DEFUALT',
}

/** Where stroke is drawn relative to the vector outline as a string enum */
export enum StrokeAligns {
  INSIDE = 'INSIDE',
  OUTSIDE = 'OUTSIDE',
  CENTER = 'CENTER',
}

/** A string enum with value, describing how corners in vector paths are rendered. */
export enum StrokeJoins {
  MITER = 'MITER',
  BEVEL = 'BEVEL',
  ROUND = 'ROUND',
}

export enum Images {
  JPG = 'JPG',
  PNG = 'PNG',
  SVG = 'SVG',
}

/** A string enum with value, indicating the type of boolean operation applied */
export enum BooleanOperations {
  UNION = 'UNION',
  INTERSECT = 'INTERSECT',
  SUBTRACT = 'SUBTRACT',
  EXCLUDE = 'EXCLUDE',
}

/** Text casing applied to the node, default is the original casing */
export enum TextCases {
  ORIGINAL = 'ORIGINAL',
  UPPER = 'UPPER',
  LOWER = 'LOWER',
  TITLE = 'TITLE',
}

/** Text decoration applied to the node */
export enum TextDecorations {
  NONE = 'NONE',
  STRIKETHROUGH = 'STRIKETHROUGH',
  UNDERLINE = 'UNDERLINE',
}

/** The unit of the line height value specified by the user. */
export enum LineHeightUnits {
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
export enum BlendModes {
  // Normal blends:
  /** (Only applicable to objects with children) */
  PASS_THROUGH = 'PASS_THROUGH',
  /** (Only applicable to objects with children) */
  NORMAL = 'NORMAL',

  /** Darken */
  DARKEN = 'DARKEN',
  MULTIPLY = 'MULTIPLY',
  LINEAR_BURN = 'LINEAR_BURN',
  COLOR_BURN = 'COLOR_BURN',

  /** Lighten */
  LIGHTEN = 'LIGHTEN',
  SCREEN = 'SCREEN',
  LINEAR_DODGE = 'LINEAR_DODGE',
  COLOR_DODGE = 'COLOR_DODGE',

  /** Contrast */
  OVERLAY = 'OVERLAY',
  SOFT_LIGHT = 'SOFT_LIGHT',
  HARD_LIGHT = 'HARD_LIGHT',

  /** Inversion */
  DIFFERENCE = 'DIFFERENCE',
  EXCLUSION = 'EXCLUSION',

  /** Component */
  HUE = 'HUE',
  SATURATION = 'SATURATION',
  COLOR = 'COLOR',
  LUMINOSITY = 'LUMINOSITY',
}

/**
 * Enum describing animation easing curves
 * This type is a string enum with the following possible values
 * "EASE_IN": Ease in with an animation curve similar to CSS ease-in.
 * "EASE_OUT": Ease out with an animation curve similar to CSS ease-out.
 * "EASE_IN_AND_OUT": Ease in and then out with an animation curve similar to CSS ease-in-out.
 */
export enum EasingTypes {
  /** Ease in with an animation curve similar to CSS ease-in. */
  EASE_IN = 'EASE_IN',
  /** Ease out with an animation curve similar to CSS ease-out. */
  EASE_OUT = 'EASE_OUT',
  /** Ease in and then out with an animation curve similar to CSS ease-in-out. */
  EASE_IN_AND_OUT = 'EASE_IN_AND_OUT',
  LINEAR = 'LINEAR',
}

export enum LayoutConstraints {
  LEFT_RIGHT = 'LEFT_RIGHT',
  RIGHT = 'RIGHT',
  CENTER = 'CENTER',
  SCALE = 'SCALE',
  TOP_BOTTOM = 'TOP_BOTTOM',
}

export enum HorizontalLayoutConstraints {
  LEFT_RIGHT = 'LEFT_RIGHT',
  RIGHT = 'RIGHT',
  CENTER = 'CENTER',
  SCALE = 'SCALE',
}

export enum VerticalLayoutConstraints {
  TOP_BOTTOM = 'TOP_BOTTOM',
  CENTER = 'CENTER',
  SCALE = 'SCALE',
}

export enum LayoutGridPatterns {
  COLUMNS = 'COLUMNS',
  ROWS = 'ROWS',
  GRID = 'GRID',
}

export enum LayoutGridAligments {
  MIN = 'MIN',
  MAX = 'MAX',
  CENTER = 'CENTER',
}

export enum PathWindingRules {
  EVENODD = 'EVENODD',
  NONZERO = 'NONZERO',
}

export enum Effects {
  INNER_SHADOW = 'INNER_SHADOW',
  DROP_SHADOW = 'DROP_SHADOW',
  LAYER_BLUR = 'LAYER_BLUR',
  BACKGROUND_BLUR = 'BACKGROUND_BLUR',
}

export enum TypePaints {
  SOLID = 'SOLID',
  GRADIENT_LINEAR = 'GRADIENT_LINEAR',
  GRADIENT_RADIAL = 'GRADIENT_RADIAL',
  GRADIENT_ANGULAR = 'GRADIENT_ANGULAR',
  GRADIENT_DIAMOND = 'GRADIENT_DIAMOND',
  IMAGE = 'IMAGE',
  EMOJI = 'EMOJI',
}

export enum ScaleModePaints {
  FILL = 'FILL',
  FIT = 'FIT',
  TILE = 'TILE',
  STRETCH = 'STRETCH',
}

export enum ConstrainTypes {
  /** Scale by value */
  SCALE = 'SCALE',
  /** Scale proportionally and set width to value */
  WIDTH = 'WIDTH',
  /** Scale proportionally and set width to value */
  HEIGHT = 'HEIGHT',
}

export enum StyleTypes {
  FILL = 'FILL',
  TEXT = 'TEXT',
  EFFECT = 'EFFECT',
  GRID = 'GRID',
}
