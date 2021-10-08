import { Style } from '../style';
import { LayoutStyle } from './layout-style';

//TODO: add desc
export function centerLayout<T extends Partial<Style>>(
  this: T,
  lps: LayoutStyle
): void {
  if (lps.isVertical) {
    lps.outerClass += ' centerer';
    lps.outerStyle.alignItems = 'center';
    if (lps.styleNode !== null) {
      this.marginTop = `${
        Number.parseFloat(lps.styleNode.top) -
        Number.parseFloat(lps.styleNode.bottom)
      }`;
      this.marginTop += 'px';
    }
  } else {
    lps.outerStyle.justifyContent = 'center';

    if (lps.styleNode !== null) {
      this.width = lps.styleNode.width + 'px';
      this.marginLeft =
        lps.styleNode.left && lps.styleNode.right
          ? `${
              Number.parseFloat(lps.styleNode.left) -
              Number.parseFloat(lps.styleNode.right)
            }`
          : null;
      this.marginLeft += 'px';
    }
  }
}
