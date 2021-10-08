import { appendMarkup } from '../append-markup';
import { Markup } from '../markup';
import { NodeMarkup } from './node-markup';

/**
 * Set main markup.
 * @param property is parameters with indent string, innerClass, nodeName, id, outerClass.
 * @param _appendMarkup is a callback with the ability to bind another context - appendMarkup.bind(newContext).
 */
export function divMarkup<T extends Partial<Markup>>(
  this: T,
  property: Partial<NodeMarkup>,
  _appendMarkup?: (html: string, indent: string) => void
): void {
  _appendMarkup
    ? _appendMarkup(
        `<div [ngStyle]="${JSON.stringify(property.outerStyle).replace(
          /"/g,
          "'"
        )}" class="${property.outerClass.replace(/"/g, "'")}">`,
        property.indent
      )
    : appendMarkup.call(
        this,
        `<div [ngStyle]="${JSON.stringify(property.outerStyle).replace(
          /"/g,
          "'"
        )}" class="${property.outerClass.replace(/"/g, "'")}">`,
        property.indent
      );
  if (property.nodeName !== 'div') {
    _appendMarkup
      ? _appendMarkup(
          `  <${property.nodeName} [props]="props"`,
          property.indent
        )
      : appendMarkup.call(
          this,
          `  <${property.nodeName} [props]="props"`,
          property.indent
        );
  } else {
    _appendMarkup
      ? _appendMarkup(`  <div`, property.indent)
      : appendMarkup.call(this, `  <div`, property.indent);
  }
  _appendMarkup
    ? _appendMarkup(`    id="${property.node.id}"`, property.indent)
    : appendMarkup.call(this, `    id="${property.node.id}"`, property.indent);
  _appendMarkup
    ? _appendMarkup(
        `    [ngStyle]="${JSON.stringify(property.style).replace(/"/g, "'")}"`,
        property.indent
      )
    : appendMarkup.call(
        this,
        `    [ngStyle]="${JSON.stringify(property.style).replace(/"/g, "'")}"`,
        property.indent
      );
  _appendMarkup
    ? _appendMarkup(`    class="${property.innerClass}"`, property.indent)
    : appendMarkup.call(
        this,
        `    class="${property.innerClass}"`,
        property.indent
      );
  // appendMarkup(`  >`, property.indent);
  _appendMarkup
    ? _appendMarkup(`  >`, property.indent)
    : appendMarkup.call(this, `  >`, property.indent);
  if (property.nodeName !== 'div') {
    _appendMarkup
      ? _appendMarkup(`</${property.nodeName}>`, property.indent)
      : appendMarkup.call(this, `</${property.nodeName}>`, property.indent);
    _appendMarkup
      ? _appendMarkup(`</div>`, property.indent)
      : appendMarkup.call(this, `</div>`, property.indent);
  }
}
