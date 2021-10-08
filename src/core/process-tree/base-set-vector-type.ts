import { ItemNode, Nodes, Verticals, Horizontals } from '../api';
import { BaseVector } from './base-vector';

//TODO: add desc
export function baseSetVectorType<T extends Partial<ItemNode>>(
  this: T,
  property: Partial<BaseVector>
): void {
  if (property.children && property.children.length && property.isVectorsOnly) {
    this.type = Nodes.VECTOR;
    this.constraints = {
      vertical: property.vectorVConstraint,
      horizontal: property.vectorHConstraint,
    };
  }

  if (property.vectorTypes.indexOf(this.type) >= 0) {
    this.type = Nodes.VECTOR;
    property.vectorMap[this.id] = this;
    property.vectors.push(this.id);
    this.children = [];
  }
}
