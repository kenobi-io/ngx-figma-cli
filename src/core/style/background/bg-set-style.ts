import { Nodes, TypePaints } from "../../api";
import { SetStyle } from "../set-style";
import { Style } from "../style";
import { BackgroundParamStyle } from "./param-bg-style";

export interface BackgroundSetStyle
  extends SetStyle<Partial<Style>, TypePaints | Nodes> {
  style: Partial<Style>;
  invoke(
    typePaintEnum: TypePaints | Nodes,
    bgParamStyle: BackgroundParamStyle
  ): void;
}
