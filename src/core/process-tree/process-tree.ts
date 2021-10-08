import { StringLiteralLike } from 'typescript';
import { ItemNode, Nodes, Verticals, Horizontals } from '../api';
import { baseSetVectorType } from './base-set-vector-type';
import { BaseVector } from './base-vector';
import { normalSetVectorType } from './normal-set-vector-type';

//TODO: add desc
export function preprocessTree<T extends Partial<ItemNode>>(
  this: T,
  vectors: string[],
  _normalSetVectorType?: () => void,
  _baseSetVectorType?: (property: BaseVector) => void
): string[] {
  const vectorMap: ItemNode = {} as ItemNode;
  const vectorTypes: string[] | Nodes = [
    Nodes.VECTOR,
    Nodes.LINE,
    Nodes.REGULAR_POLYGON,
    Nodes.ELLIPSE,
    Nodes.STAR,
  ];
  let isVectorsOnly = this.name.charAt(0) !== '#';
  let vectorVConstraint: Verticals = null;
  let vectorHConstraint: Horizontals = null;
  _normalSetVectorType
    ? _normalSetVectorType()
    : normalSetVectorType.call(this);
  const children =
    this.children && this.children.filter((child) => child.visible !== false);
  children &&
    children.map((child) => {
      if (vectorTypes.indexOf(child.type) < 0) {
        isVectorsOnly = false;
      } else {
        if (
          vectorVConstraint != null &&
          child.constraints.vertical != vectorVConstraint
        )
          isVectorsOnly = false;
        if (
          vectorHConstraint != null &&
          child.constraints.horizontal != vectorHConstraint
        ) {
          isVectorsOnly = false;
        }
        vectorVConstraint = child.constraints.vertical;
        vectorHConstraint = child.constraints.horizontal;
      }
    });
  this.children = children;
  const baseVector: BaseVector = {
    children,
    isVectorsOnly,
    vectorVConstraint,
    vectorHConstraint,
    vectorTypes,
    vectorMap,
    vectors,
  };
  _baseSetVectorType
    ? _baseSetVectorType(baseVector)
    : baseSetVectorType.call(this, baseVector);
  this.children &&
    this.children.map((child) => {
      preprocessTree.call(child, vectors);
    });
  return vectors;
}
