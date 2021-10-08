import { Markup } from '../markup';
import { NodeMarkup } from './node-markup';
import { ItemNode } from '../../api';
import { appendMarkup } from '../append-markup';
import { divMarkup } from './div-markup';
import { createNode } from '../../component';

/**
 * Set main markup.
 * @param property is parameters with indent string.
 * @param _appendMarkup is a callback with the ability to bind another context appendMarkup.bind(newContext).
 * @param _divMarkup is a callback with the ability to bind another context.
 * @param _createNode is a callback with no way to bind another context.
 */
export function markup<T extends Partial<Markup>, K extends Partial<ItemNode>>(
  this: T,
  property: Partial<NodeMarkup>,
  _appendMarkup?: (html: string, indent: string) => void,
  _divMarkup?: (property: Partial<NodeMarkup>) => void,
  _createNode?: (
    this: T,
    parent: K,
    lastVertical: number,
    indent: string
  ) => void
): void {
  const newNodeBounds = property.node.absoluteBoundingBox;
  const newLastVertical =
    newNodeBounds && newNodeBounds.y + newNodeBounds.height;
  _appendMarkup
    ? _appendMarkup(`    <div>`, property.indent)
    : appendMarkup.call(this, `    <div>`, property.indent);
  let first = true;

  for (const child of property.minChildren) {
    _createNode
      ? _createNode.call(
          child,
          property.node,
          first ? null : newLastVertical,
          property.indent + '      '
        )
      : createNode.call(
          child,
          property.node,
          first ? null : newLastVertical,
          property.indent + '      '
        );
    first = false;
  }

  for (const child of property.centerChildren) {
    _createNode
      ? _createNode.call(child, property.node, null, property.indent + '      ')
      : createNode.call(child, property.node, null, property.indent + '      ');
  }

  if (property.maxChildren.length > 0) {
    property.outerClass += ' maxer';
    property.style.width = '100%';
    property.style.pointerEvents = 'none';
    property.style.backgroundColor = null;
    property.indent += '      ';
    _divMarkup ? _divMarkup(property) : divMarkup.call(this, property);
    first = true;

    for (const child of property.maxChildren) {
      createNode.bind(child)(
        property.node,
        first ? null : newLastVertical,
        property.indent + '          '
      );
      first = false;
    }
    _appendMarkup
      ? _appendMarkup(`        </div>`, property.indent)
      : appendMarkup.call(this, `        </div>`, property.indent);
    _appendMarkup
      ? _appendMarkup(`      </div>`, property.indent)
      : appendMarkup.call(this, `      </div>`, property.indent);
  }
  if (property.content != null) {
    if (property.node.name.charAt(0) === '$') {
      for (const piece of property.content) {
        _appendMarkup
          ? _appendMarkup(piece, property.indent + '        ')
          : appendMarkup.call(this, piece, property.indent + '        ');
      }
    } else {
      for (const piece of property.content) {
        _appendMarkup
          ? _appendMarkup(piece, property.indent + '      ')
          : appendMarkup.call(this, piece, property.indent + '      ');
      }
    }
  }
  _appendMarkup
    ? _appendMarkup(`    </div>`, property.indent)
    : appendMarkup.call(this, `    </div>`, property.indent);
}
