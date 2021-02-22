import { ParamConstraint } from './param-constraint';

export interface SetLayoutConstraint<T> {
    style: T;
    set(paramConstraint: ParamConstraint<T>): void;
}