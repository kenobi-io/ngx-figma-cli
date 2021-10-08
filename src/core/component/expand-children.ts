import { ItemNode, Nodes, Verticals, Horizontals } from '../api';

//TODO: add desc
export function expandChildren<T extends Partial<ItemNode>>(
  this: T,
  parent: T, // TODO: replace params by ComponentItemNode
  minChildren: T[],
  maxChildren: T[],
  centerChildren: T[],
  offset: number
): number {
  const groupTypes: string[] = [Nodes.GROUP, Nodes.BOOLEAN_OPERATION];
  const children = this.children as T[];
  let added = offset;

  if (children) {
    children
      .filter((child, index) => {
        if (
          parent != null &&
          (this.type === Nodes.COMPONENT || this.type === Nodes.INSTANCE)
        ) {
          child.constraints = {
            vertical: Verticals.TOP_BOTTOM,
            horizontal: Horizontals.LEFT_RIGHT,
          };
        }

        if (groupTypes.indexOf(child.type) >= 0) {
          added += expandChildren.call(
            child,
            parent,
            minChildren,
            maxChildren,
            centerChildren,
            added + index
          );
          return false;
        }
        return true;
      })
      .map((child, index) => {
        child.order = index + added;
        if (
          child.constraints &&
          child.constraints.vertical === Verticals.BOTTOM
        ) {
          maxChildren.push(child);
        } else if (
          child.constraints &&
          child.constraints.vertical === Verticals.TOP
        ) {
          minChildren.push(child);
        } else {
          centerChildren.push(child);
        }
      });

    minChildren.sort((a, b) => {
      if (a.absoluteBoundingBox.y < b.absoluteBoundingBox.y) {
        return -1;
      } else if (a.absoluteBoundingBox.y === b.absoluteBoundingBox.y) {
        return 0;
      } else {
        return 1;
      }
    });
    maxChildren.sort((a, b) => {
      if (a.absoluteBoundingBox.y < b.absoluteBoundingBox.y) {
        return -1;
      } else if (a.absoluteBoundingBox.y === b.absoluteBoundingBox.y) {
        return 0;
      } else {
        return 1;
      }
    });

    return added + children.length - offset;
  }

  return added - offset;
}
