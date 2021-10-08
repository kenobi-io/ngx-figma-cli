import { Style } from '../style';
import { LayoutStyle } from './layout-style';

//TODO: add desc
export function verticalLayout<T extends Partial<Style>>(
  this: T,
  ls: LayoutStyle
): void {
  if (ls.styleNode !== null) {
    this.height = null;
    this.marginTop = ls.styleNode.top + 'px';
    this.marginBottom = ls.styleNode.bottom + 'px';
    this.minHeight = ls.styleNode.height + 'px';
  }
}
