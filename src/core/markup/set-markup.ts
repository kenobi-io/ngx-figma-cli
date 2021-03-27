import { ParamMarkup } from './param-markup';

export interface SetMarkup<T, K extends { [key: number]: string | number; }> {
    markup: T;
    set(key: K, param: ParamMarkup): void;
}