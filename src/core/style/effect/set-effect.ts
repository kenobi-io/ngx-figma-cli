import { ParamEffect } from './param-effect';

export interface SetEffect<T> {
    style: T;
    set(paramEffect: ParamEffect): void;
}