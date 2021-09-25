export interface SchemaFigma {
  document: DocFigma;
  components: { [key: string]: Component };
  componentSets: ComponentSets;
  schemaVersion: number;
  styles: StyleSets;
  name: string;
  lastModified: string;
  thumbnailUrl: string;
  version: string;
  role: string;
  editorType: string;
}

export interface ItemNode {
  absoluteBoundingBox: AbsoluteBoundingBox;
  blendMode: ChildBlendMode;
  characters: string;
  characterStyleOverrides: any[];
  constraints: Constraints;
  effects: any[];
  fills: Background[];
  id: string;
  layoutVersion: number;
  name: string;
  strokeAlign: StrokeAlignEnum;
  strokes: any[];
  strokeWeight: number;
  style: TextStyle;
  styleOverrideTable: ComponentSets;
  type: string;
  background?: Background[];
  backgroundColor?: ColorStyle;
  children?: IndigoChild[];
  clipsContent?: boolean;
  cornerRadius?: number;
  rectangleCornerRadii?: number[];
  visible: boolean;
  order: number;
}

export interface ComponentSets {}
export interface StyleSets {}

export interface Component {
  key: string;
  name: string;
  description: string;
  documentationLinks: any[];
}

export interface DocFigma {
  id: string;
  name: string;
  type: string;
  children: ItemDocument[];
}

export interface ItemDocument {
  id: string;
  name: string;
  type: string;
  children: ItemNode[];
  backgroundColor: ColorStyle;
  prototypeStartNodeID: null;
  flowStartingPoints: any[];
  prototypeDevice: PrototypeDevice;
  exportSettings?: any[];
}

export interface ColorStyle {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface AbsoluteBoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Background {
  blendMode: BackgroundBlendMode;
  type: string;
  color: ColorStyle;
  visible?: boolean;
  imageRef: string;
  scaleMode: string;
  opacity: number;
  gradientHandlePositions;
  gradientStops;
}

export enum BackgroundBlendMode {
  NORMAL = 'NORMAL',
}

// export enum Type {
//   SOLID = 'SOLID',
// }

export enum ChildBlendMode {
  PASS_THROUGH = 'PASS_THROUGH',
}

export interface FluffyChild {
  id: string;
  name: string;
  type: string;
  blendMode: ChildBlendMode;
  children?: TentacledChild[];
  absoluteBoundingBox: AbsoluteBoundingBox;
  constraints: Constraints;
  clipsContent?: boolean;
  background?: Background[];
  fills: Background[];
  strokes: Background[];
  strokeWeight: number;
  strokeAlign: StrokeAlignEnum;
  backgroundColor?: ColorStyle;
  exportSettings: any[];
  effects: any[];
  componentId?: string;
  preserveRatio?: boolean;
  layoutGrids?: LayoutGrid[];
}

export interface TentacledChild {
  id: string;
  name: string;
  type: string;
  blendMode: ChildBlendMode;
  children?: StickyChild[];
  absoluteBoundingBox: AbsoluteBoundingBox;
  constraints: Constraints;
  clipsContent?: boolean;
  background?: Background[];
  fills: Background[];
  strokes: any[];
  strokeWeight: number;
  strokeAlign: StrokeAlignEnum;
  backgroundColor?: ColorStyle;
  effects: any[];
  preserveRatio?: boolean;
  layoutGrids?: LayoutGrid[];
  componentId?: string;
  exportSettings?: any[];
  cornerRadius?: number;
  rectangleCornerRadii?: number[];
}

export interface StickyChild {
  absoluteBoundingBox: AbsoluteBoundingBox;
  background?: Background[];
  backgroundColor?: ColorStyle;
  blendMode: ChildBlendMode;
  characters?: string;
  characterStyleOverrides?: any[];
  children?: IndigoChild[];
  clipsContent?: boolean;
  constraints: Constraints;
  cornerRadius?: number;
  effects: any[];
  fills: Background[];
  id: string;
  layoutVersion?: number;
  name: string;
  rectangleCornerRadii?: number[];
  strokeAlign: StrokeAlignEnum;
  strokes: any[];
  strokeWeight: number;
  style?: TextStyle;
  styleOverrideTable?: ComponentSets;
  type: string;
}

export interface IndigoChild {
  absoluteBoundingBox: AbsoluteBoundingBox;
  blendMode: ChildBlendMode;
  characters: string;
  characterStyleOverrides: any[];
  constraints: Constraints;
  effects: any[];
  fills: Background[];
  id: string;
  layoutVersion: number;
  name: string;
  strokeAlign: StrokeAlignEnum;
  strokes: any[];
  strokeWeight: number;
  style: TextStyle;
  styleOverrideTable: ComponentSets;
  type: string;
}

export interface Constraints {
  vertical: Verticals;
  horizontal: StrokeAlign;
}

export enum StrokeAlign {
  CENTER = 'CENTER',
  LEFT = 'LEFT',
  SCALE = 'SCALE',
}

export enum Verticals {
  SCALE = 'SCALE',
  TOP = 'TOP',
}

// export enum LayoutConstraints {
//   LEFT_RIGHT = 'LEFT_RIGHT',
//   RIGHT = 'RIGHT',
//   CENTER = 'CENTER',
//   SCALE = 'SCALE',
//   TOP_BOTTOM = 'TOP_BOTTOM',
// }

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

export enum StrokeAlignEnum {
  CENTER = 'CENTER',
  INSIDE = 'INSIDE',
  OUTSIDE = 'OUTSIDE',
}

export interface TextStyle {
  fontFamily: string;
  fontPostScriptName: string;
  fontWeight: number;
  fontSize: number;
  textAlignHorizontal: string;
  textAlignVertical: string;
  letterSpacing: number;
  lineHeightPx: number;
  lineHeightPercent: number;
  lineHeightUnit: string;
  italic;
}

export interface LayoutGrid {
  pattern: string;
  sectionSize: number;
  visible: boolean;
  color: ColorStyle;
  alignment: string;
  gutterSize: number;
  offset: number;
  count: number;
}

export interface PrototypeDevice {
  type: string;
  rotation: string;
}
