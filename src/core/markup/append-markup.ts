import { Markup } from './markup';

//TODO: add desc
export function appendMarkup<T extends Partial<Markup>>(
  this: T,
  html: string,
  indent: string
): void {
  this.doc += `${indent}${html}\n`;
}
