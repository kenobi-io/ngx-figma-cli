import { Background } from '../../api';

export function hasNeedRenderBackground<T extends Partial<Background>>(
  backgrounds: T[]
): boolean {
  if (!backgrounds) {
    return false;
  }

  let numPaints = 0;
  for (const paint of backgrounds) {
    if (paint.visible === false) {
      continue;
    }
    numPaints++;

    if (paint.type === 'EMOJI') {
      return true;
    }
  }

  return numPaints > 1;
}
