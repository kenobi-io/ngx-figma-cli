import { Style } from '../style';
import { LayoutStyle } from './layout-style';

//TODO: add desc
export function bottomTopLayout<T extends Partial<Style>>(
  this: T,
  lps: LayoutStyle
): void {
  lps.outerClass += ' centerer';

  if (lps.styleNode !== null) {
    this.marginTop = lps.styleNode.top + 'px';
    this.marginBottom = lps.styleNode.bottom + 'px';
  }
}
