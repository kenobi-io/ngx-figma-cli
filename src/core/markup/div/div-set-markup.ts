import { SetMarkup } from "../set-markup";
import { Markup } from "../markup";
import { Nodes, Characters } from "../../api";
import { DivParamMarkup } from "./div-param-markup";

export interface DivSetMarkup
  extends SetMarkup<Partial<Markup>, Nodes | Characters> {
  markup: Partial<Markup>;
  invoke(nodeTypes: Nodes | Characters, divParamMarkup: DivParamMarkup): void;
}
