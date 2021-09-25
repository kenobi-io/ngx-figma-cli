import { ParamStyle } from '../param-style';
import { ItemNode } from '../../api/figma/nodes/figma';

export interface StrokeParamStyle extends ParamStyle {
  value: ItemNode;
}
