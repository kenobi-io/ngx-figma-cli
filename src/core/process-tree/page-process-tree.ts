import { SchemaFigma, ItemDocument, ItemNode } from '../api';
import { BaseVector } from './base-vector';
import { preprocessTree } from './process-tree';

//TODO: add desc
export function pagePreprocess<T extends Partial<SchemaFigma>>(
  result: T,
  vectors: string[],
  _preprocessTree?: (
    this: Partial<ItemNode>,
    vectors: string[],
    _normalSetVectorType?: () => void,
    _baseSetVectorType?: (property: BaseVector) => void
  ) => string[]
): ItemDocument {
  const doc = result.document;
  console.log('only the first page of all figma pages is generated!');
  const pageOneItems = doc.children[0];

  for (let i = 0; i < pageOneItems.children.length; i++) {
    const child = pageOneItems.children[i];
    if (child.name.charAt(0) === '#' && child.visible !== false) {
      const child = pageOneItems.children[i];
      _preprocessTree
        ? _preprocessTree.call(child, vectors)
        : preprocessTree.call(child, vectors);
    }
  }

  return pageOneItems;
}
