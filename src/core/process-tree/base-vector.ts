import { Horizontals, ItemNode, Verticals } from '../api';

export interface BaseVector {
  children: ItemNode[];
  isVectorsOnly: boolean;
  vectorVConstraint: Verticals;
  vectorHConstraint: Horizontals;
  vectorTypes: string[];
  vectorMap: ItemNode;
  vectors: string[];
}
