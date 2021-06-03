import { Nodes } from "../../api";
import { SetStyle } from "../set-style";
import { Style } from "../style";
import { FontParamStyle } from "./font-param-style";

export interface FontSetStyle extends SetStyle<Partial<Style>, Nodes> {
  style: Partial<Style>;
  invoke(nodeTypeEnum: Nodes, fontParamStyle: FontParamStyle): void;
}
