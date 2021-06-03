import { ParamStyle } from "./param-style";

export interface SetStyle<T, K extends { [key: number]: string | number }> {
  style: T;
  invoke(key: K, param: ParamStyle): void;
}
