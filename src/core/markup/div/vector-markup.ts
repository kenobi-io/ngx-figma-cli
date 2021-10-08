import { appendMarkup } from '../append-markup';
import { Markup } from '../markup';
import { NodeMarkup } from './node-markup';

/**
 * Set div with class vector and imgMap value.
 * @param property is parameters with indent string.
 * @param _appendMarkup is callback for bind of other context appendMarkup.bind(newContext).
 */
export function vectorMarkup<T extends Partial<Markup>>(
  this: T,
  property: Partial<NodeMarkup>,
  _appendMarkup?: (html: string, indent: string) => void
): void {
  _appendMarkup
    ? _appendMarkup(
        `<div class="vector">${this.imgMap[property.node.id]}</div>`,
        property.indent
      )
    : appendMarkup.call(
        this,
        `<div class="vector">${this.imgMap[property.node.id]}</div>`,
        property.indent
      );
}
