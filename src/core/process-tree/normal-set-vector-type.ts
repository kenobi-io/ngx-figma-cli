import { BackgroundBlendModes, ChildBlendModes, ItemNode, Nodes } from '../api';
import { hasNeedRenderBg } from '../style';

//TODO: add desc
export function normalSetVectorType<T extends Partial<ItemNode>>(
  this: T,
  _hasNeedRenderBackground?: () => boolean
): void {
  const isFill = _hasNeedRenderBackground
    ? _hasNeedRenderBackground()
    : hasNeedRenderBg.call(this.fills);
  const isStroke = _hasNeedRenderBackground
    ? _hasNeedRenderBackground()
    : hasNeedRenderBg.call(this.strokes);
  if (
    isFill ||
    isStroke ||
    (this.blendMode != null &&
      [ChildBlendModes.PASS_THROUGH, BackgroundBlendModes.NORMAL].indexOf(
        this.blendMode
      ) < 0)
  ) {
    this.type = Nodes.VECTOR;
  }
}
