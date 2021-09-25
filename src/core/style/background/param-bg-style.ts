import { ParamStyle } from '../param-style';
import { ItemNode } from '../../api/figma/nodes/figma';

export interface BackgroundParamStyle extends ParamStyle {
  value: ItemNode;
}
