import { EffectParamStyle } from "./effect-param-style";
import { Effects } from "../../api";
import { Style } from "../style";
import { SetStyle } from "../set-style";

export interface EffectSetStyle extends SetStyle<Partial<Style>, Effects> {
  style: Partial<Style>;
  invoke(effectEnum: Effects, effectParamStyle: EffectParamStyle): void;
}
