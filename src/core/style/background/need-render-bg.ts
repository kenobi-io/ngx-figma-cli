import { Background } from '../../api';

//TODO: add desc
export function hasNeedRenderBg<T extends Partial<Background>>(
  this: T[]
): boolean {
  if (!this) {
    return false;
  }

  let numPaint = 0;
  for (const paint of this) {
    if (paint.visible === false) {
      continue;
    }
    numPaint++;

    if (paint.type === 'EMOJI') {
      return true;
    }
  }

  return numPaint > 1;
}
