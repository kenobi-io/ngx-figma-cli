import { Style } from '../style';
import { LayoutStyle } from './layout-style';

//TODO: add desc
export function scaleLayout<T extends Partial<Style>>(
  this: T,
  ls: LayoutStyle
): void {
  if (ls.isVertical) {
    ls.outerClass += ' centerer';
    if (ls.styleNode !== null) {
      const parentHeight =
        Number.parseFloat(ls.styleNode.top) +
        Number.parseFloat(ls.styleNode.height) +
        Number.parseFloat(ls.styleNode.bottom);
      this.height = `${
        (Number.parseFloat(ls.styleNode.height) * 100) / parentHeight
      }%`;
      this.top = `${
        (Number.parseFloat(ls.styleNode.top) * 100) / parentHeight
      }%`;
    }
  } else {
    if (ls.styleNode !== null) {
      const parentWidth =
        Number.parseFloat(ls.styleNode.left) +
        Number.parseFloat(ls.styleNode.width) +
        Number.parseFloat(ls.styleNode.right);
      this.width = `${
        (Number.parseFloat(ls.styleNode.width) * 100) / parentWidth
      }%`;
      this.marginLeft = `${
        (Number.parseFloat(ls.styleNode.left) * 100) / parentWidth
      }%`;
    }
  }
}
