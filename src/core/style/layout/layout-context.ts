import {
  HorizontalLayoutConstraints,
  LayoutConstraints,
  VerticalLayoutConstraints,
} from '../../api';
import { InnerArrow } from '../../inner-arrow';
import { Style } from '../style';
import { bottomTopLayout } from './bottom-top-layout';
import { centerLayout } from './center-layout';
import { horizontalLayout } from './horizontal-default-layout';
import { LayoutStyle } from './layout-style';
import { leftRightLayout } from './left-right-layout';
import { rightLayout } from './right-layout';
import { scaleLayout } from './scale-layout';
import { verticalLayout } from './vertical-default-layout';

export function layoutContext(
  style: Partial<Style>,
  layoutConstraint:
    | HorizontalLayoutConstraints
    | VerticalLayoutConstraints
    | string,
  layoutParamStyle: LayoutStyle
): void {
  const map = new Map<
    LayoutConstraints | string,
    (this: Partial<Style>, lps: LayoutStyle) => void
  >()
    .set(LayoutConstraints.LEFT_RIGHT, leftRightLayout)
    .set(LayoutConstraints.RIGHT, rightLayout)
    .set(LayoutConstraints.SCALE, scaleLayout)
    .set(LayoutConstraints.CENTER, centerLayout)
    .set(LayoutConstraints.TOP_BOTTOM, bottomTopLayout);

  if (!layoutParamStyle.isVertical) {
    const hor = Object.values(HorizontalLayoutConstraints).find(
      (value) => value === layoutConstraint
    );
    if (
      layoutParamStyle.styleNode &&
      layoutParamStyle.styleNode.height &&
      layoutConstraint !== LayoutConstraints.TOP_BOTTOM
    ) {
      style.height = layoutParamStyle.styleNode.height + 'px';
    }
    if (!hor) {
      horizontalLayout.call(style, layoutParamStyle);
      return;
    }
  } else {
    const ver = Object.values(VerticalLayoutConstraints).find(
      (value) => value === layoutConstraint
    );
    if (!ver) {
      verticalLayout.call(style, layoutParamStyle);
      return;
    }
  }
  const invoke = map.get(layoutConstraint);
  invoke && invoke.call(style, layoutParamStyle);
}
