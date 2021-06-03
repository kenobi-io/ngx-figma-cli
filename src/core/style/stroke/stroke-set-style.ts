import { Nodes } from "../../api";
import { SetStyle } from "../set-style";
import { Style } from "../style";
import { StrokeParamStyle } from "./stroke-param-style";

export interface StrokeSetStyle extends SetStyle<Partial<Style>, Nodes> {
  style: Partial<Style>;
  invoke(nodeTypeEnum: Nodes, strokeParamStyle: StrokeParamStyle): void;
}
