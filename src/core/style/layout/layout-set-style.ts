import { LayoutConstraints } from '../../api';
import { SetStyle } from '../set-style';
import { Style } from '../style';
import { LayoutParamStyle } from './layout-param-style';

export interface LayoutSetStyle extends SetStyle<Partial<Style>, LayoutConstraints> {
    style: Partial<Style>;
    set(layoutConstraint: LayoutConstraints, layoutParamStyle: LayoutParamStyle): void;
}