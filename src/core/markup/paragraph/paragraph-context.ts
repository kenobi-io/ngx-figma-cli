import { Nodes } from '../../api';
import { ParagraphMarkup } from './paragraph-markup';
import { textParagraph } from './text-paragraph';

export function paragraphContext(
  nodeTypes: Nodes | string,
  context: ParagraphMarkup
): void {
  if (nodeTypes === Nodes.TEXT) {
    textParagraph.call(context);
  }
}
