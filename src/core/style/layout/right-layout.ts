import { Style } from '../style';
import { LayoutStyle } from './layout-style';

//TODO: add desc
export function rightLayout<T extends Partial<Style>>(
  this: T,
  ls: LayoutStyle
): void {
  ls.outerStyle.justifyContent = 'flex-end';
  if (ls.styleNode !== null) {
    this.marginRight = ls.styleNode.right + 'px';
    this.width = ls.styleNode.width + 'px';
    this.minWidth = ls.styleNode.width + 'px';
  }
}
