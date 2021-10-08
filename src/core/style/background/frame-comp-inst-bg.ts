import { colorStyleToString } from '../../component';
import { ColorStyle, ItemNode } from '../../api';
import { Style } from '../style';

//TODO: add desc
export function frameCompInstBg<T extends Partial<Style>>(
  this: T,
  node: ItemNode,
  _colorStyleToString?: () => string
): void {
  this.backgroundColor = _colorStyleToString
    ? _colorStyleToString()
    : colorStyleToString.call(node.backgroundColor);
  if (node.clipsContent) {
    this.overflow = 'hidden';
  }
}
