import { Style } from '../style';

export interface LayoutStyle {
  styleNode: Style;
  outerStyle: Style;
  outerClass: string;
  isVertical: boolean;
}
