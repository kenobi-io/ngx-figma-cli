import { Style } from '../style';
import { LayoutStyle } from './layout-style';

//TODO: add desc
export function horizontalLayout<T extends Partial<Style>>(
  this: T,
  ls: LayoutStyle
): void {
  if (ls.styleNode !== null) {
    this.marginLeft = ls.styleNode.left + 'px';
    this.width = ls.styleNode.width + 'px';
    this.minWidth = ls.styleNode.width + 'px';
  }
}
