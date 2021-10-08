import { ParagraphMarkup } from './paragraph-markup';

//TODO: add desc
export function commitParagraph<T extends Partial<ParagraphMarkup>>(
  this: T,
  key: any
): string[] {
  if (this.para !== '') {
    if (this.styleCache[this.currStyle] == null && this.currStyle !== 0) {
      this.styleCache[this.currStyle] = {};
      // paragraph?.fontSetStyle.invoke(
      //   paragraph.styleCache[paragraph.currStyle],
      //   paragraph.value.styleOverrideTable[paragraph.currStyle]
      // );
    }
    const styleOverride = this.styleCache[this.currStyle]
      ? JSON.stringify(this.styleCache[this.currStyle])
      : '{}';
    let varName;

    if (this.node.name.charAt(0) === '$') {
      varName = this.node.name.substring(1);
    }

    if (varName) {
      this.para = `
          <ng-container *ngIf="props?.${varName}">{{props.${varName}}}</ng-container>
          <ng-container *ngIf="!props?.${varName}">${this.para}</ng-container>
          `;
    }
    this.ps.push(
      `<span [ngStyle]="${styleOverride.replace(/"/g, "'")}" key="${key}">${
        this.para
      }</span>`
    );
    this.para = '';
  }
  return this.ps;
}
