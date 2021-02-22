import { ParamFont } from './param-font';

export interface SetFont<T> {
    style: T;
    set(paramFont: ParamFont): void;
}