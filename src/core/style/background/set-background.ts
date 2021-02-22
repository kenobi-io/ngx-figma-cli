import { ParamBackground } from './param-background';

export interface SetBackground<T> {
    style: T;
    set(paramConstraint: ParamBackground): void;
}