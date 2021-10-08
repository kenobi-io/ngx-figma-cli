import { ItemNode, Nodes, TypePaints } from '../../api';
import { strokeText } from '../stroke/stroke-text';
import { Style } from '../style';
import { frameCompInstBg } from './frame-comp-inst-bg';
import { imageBg } from './image-bg';
import { linearGradient } from './linear-gradient';
import { radialGradient } from './radial-gradient';
import { solidBg } from './solid-bg';

export function backgroundContext(
  typePaints: TypePaints | Nodes | string,
  context: Partial<Style>,
  node: Partial<ItemNode>
): void {
  const map = new Map<TypePaints | Nodes | string, (node: ItemNode) => any>()
    .set(TypePaints.IMAGE, imageBg)
    .set(TypePaints.SOLID, solidBg)
    .set(TypePaints.GRADIENT_LINEAR, linearGradient)
    .set(TypePaints.GRADIENT_RADIAL, radialGradient)
    .set(Nodes.FRAME, frameCompInstBg)
    .set(Nodes.COMPONENT, frameCompInstBg)
    .set(Nodes.INSTANCE, frameCompInstBg)
    .set(Nodes.TEXT, strokeText);
  const invoke = map.get(typePaints);
  invoke && invoke.call(context, node);
}
