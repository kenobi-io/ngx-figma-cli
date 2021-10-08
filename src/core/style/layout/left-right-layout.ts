import { Style } from '../style';
import { LayoutStyle } from './layout-style';

//TODO: add desc
export function leftRightLayout<T extends Partial<Style>>(
  this: T,
  ls: LayoutStyle
): void {
  if (ls.styleNode !== null) {
    this.marginLeft = ls.styleNode.left + 'px';
    this.marginRight = ls.styleNode.right + 'px';
    this.flexGrow = 1;
  }
}
