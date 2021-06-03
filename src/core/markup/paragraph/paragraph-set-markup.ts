import { SetMarkup } from "../set-markup";
import { Markup } from "../markup";
import { ParagraphParamMarkup } from "./paragraph-param-markup";
import { Nodes } from "../../api";

export interface ParagraphSetMarkup extends SetMarkup<Partial<Markup>, Nodes> {
  markup: Partial<Markup>;
  invoke(typePaintEnum: Nodes, bgParamStyle: ParagraphParamMarkup): void;
}
