import { LayoutConstraint } from '../../api';
import { SetStyle } from '../set-style';
import { Style } from '../style';
import { LayoutParamStyle } from './layout-param-style';

export interface LayoutSetStyle extends SetStyle<Partial<Style>, LayoutConstraint> {
    style: Partial<Style>;
    set(layoutConstraint: LayoutConstraint, layoutParamStyle: LayoutParamStyle): void;
}