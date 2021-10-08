import { Nodes } from '../../api';
import { commitParagraph } from './commit-paragraph';
import { ParagraphMarkup } from './paragraph-markup';

//TODO: add desc
export function textParagraph<T extends Partial<ParagraphMarkup>>(
  this: T,
  _commitParagraph?: (nodeTypes: Nodes | string) => void
): void {
  if (this.node.name.substring(0, 6) === 'input:') {
    this.content = [
      `<input key="${this.node.id}"` +
        `type="text" placeholder="${this.node.characters}"` +
        ` name="${this.node.name.substring(7)}" />`,
    ];
  } else if (this.node.characterStyleOverrides) {
    for (const char of this.node.characters) {
      let idx = this.node.characterStyleOverrides[char];
      if (this.node.characters[char] === '\n') {
        this.content = _commitParagraph
          ? _commitParagraph(char)
          : commitParagraph.call(this, char);
        this.ps.push(`<br key="${`br${char}`}" />`);
        continue;
      }

      if (idx == null) {
        idx = 0;
      }

      if (idx !== this.currStyle) {
        this.content = _commitParagraph
          ? _commitParagraph(char)
          : commitParagraph.call(this, char);
        this.currStyle = idx;
      }
      this.para += this.node.characters[char];
    }
    this.content = _commitParagraph
      ? _commitParagraph('end')
      : commitParagraph.call(this, 'end');
  } else {
    this.content = this.node.characters
      .split('\n')
      .map((line: any, idx: any) => `<div key="${idx}">${line}</div>`);
  }
}
