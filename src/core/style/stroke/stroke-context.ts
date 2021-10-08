import { Style } from '../style';
import { ItemNode, Nodes } from '../../api';
import { borderRect } from './border-rect';
import { strokeText } from './stroke-text';

export function strokeContext(
  types: Nodes | string,
  context: Partial<Style>,
  node: Partial<ItemNode>
): void {
  const map = new Map<Nodes | string, (node: ItemNode) => void>()
    .set(Nodes.RECTANGLE, borderRect)
    .set(Nodes.TEXT, strokeText);
  const invoke = map.get(types);
  invoke && invoke.call(context, node);
}
