import { Background } from '../../api';

//TODO: add desc
export function lastPaint<T extends Partial<Background>>(this: T[]): T | null {
  if (this.length > 0) {
    return this[this.length - 1];
  }
  return null;
}
