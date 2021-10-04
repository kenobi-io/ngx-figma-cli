import { Nodes } from '../properties/enums.property-figma';
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
  blendMode: ChildBlendModes | BackgroundBlendModes;
  characters: string;
  characterStyleOverrides: any[];
  constraints: Constraints;
  effects: any[];
  fills: Background[];
  id: string;
  layoutVersion: number;
  name: string;
  strokeAlign: StrokeAlignOuts;
  strokes: Background[];
  strokeWeight: number;
  style: TextStyle;
  styleOverrideTable: ComponentSets;
  type: string | Nodes;
  background?: Background[];
  backgroundColor?: ColorStyle;
  children?: ItemNode[];
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
  blendMode: BackgroundBlendModes;
  type: string;
  color: ColorStyle;
  visible?: boolean;
  imageRef: string;
  scaleMode: string;
  opacity: number;
  gradientHandlePositions;
  gradientStops;
}

export enum BackgroundBlendModes {
  NORMAL = 'NORMAL',
}

// export enum Type {
//   SOLID = 'SOLID',
// }

export enum ChildBlendModes {
  PASS_THROUGH = 'PASS_THROUGH',
}

export interface FluffyChild {
  id: string;
  name: string;
  type: string;
  blendMode: ChildBlendModes;
  children?: TentacledChild[];
  absoluteBoundingBox: AbsoluteBoundingBox;
  constraints: Constraints;
  clipsContent?: boolean;
  background?: Background[];
  fills: Background[];
  strokes: Background[];
  strokeWeight: number;
  strokeAlign: StrokeAlignOuts;
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
  blendMode: ChildBlendModes;
  children?: StickyChild[];
  absoluteBoundingBox: AbsoluteBoundingBox;
  constraints: Constraints;
  clipsContent?: boolean;
  background?: Background[];
  fills: Background[];
  strokes: any[];
  strokeWeight: number;
  strokeAlign: StrokeAlignOuts;
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
  blendMode: ChildBlendModes;
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
  strokeAlign: StrokeAlignOuts;
  strokes: any[];
  strokeWeight: number;
  style?: TextStyle;
  styleOverrideTable?: ComponentSets;
  type: string;
}

export interface IndigoChild {
  absoluteBoundingBox: AbsoluteBoundingBox;
  blendMode: ChildBlendModes;
  characters: string;
  characterStyleOverrides: any[];
  constraints: Constraints;
  effects: any[];
  fills: Background[];
  id: string;
  layoutVersion: number;
  name: string;
  strokeAlign: StrokeAlignOuts;
  strokes: any[];
  strokeWeight: number;
  style: TextStyle;
  styleOverrideTable: ComponentSets;
  type: string;
}

export interface Constraints {
  vertical: Verticals;
  horizontal: Horizontals;
}

export enum Horizontals {
  CENTER = 'CENTER',
  LEFT = 'LEFT',
  SCALE = 'SCALE',
  LEFT_RIGHT = 'LEFT_RIGHT',
}

export enum Verticals {
  SCALE = 'SCALE',
  TOP = 'TOP',
  TOP_BOTTOM = 'TOP_BOTTOM',
  BOTTOM = 'BOTTOM',
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

export enum StrokeAlignOuts {
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
