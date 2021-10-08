import { Background, ItemNode } from '../../api';
import { imageUrl } from '../image-url';
import { Style } from '../style';
import { lastPaint } from './last-paint';

//TODO: add desc
export function imageBg<T extends Partial<Style>>(
  this: T,
  node: ItemNode,
  _imageUrl?: (hash: string) => string,
  _lastPaint?: () => Background | null
): void {
  const lastFill = _lastPaint ? _lastPaint() : lastPaint.call(node.fills);
  if (lastFill) {
    this.backgroundImage = _imageUrl
      ? _imageUrl(lastFill.imageRef)
      : imageUrl(lastFill.imageRef);
    if (lastFill.scaleMode === 'FILL') {
      this.backgroundSize = 'cover';
    } else {
      this.backgroundSize = null;
    }
  }
}
