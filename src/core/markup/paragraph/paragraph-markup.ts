import { Nodes } from '../../api';
import { ParagraphSetMarkup } from './paragraph-set-markup';
import { ParagraphParamMarkup } from './paragraph-param-markup';
import { Markup } from '../markup';
import { InnerArrow } from 'src/core/inner-arrow';

export class ParagraphMarkup implements ParagraphSetMarkup {
  public markup: Partial<Markup>;
  private paragraphMap: Map<Nodes | string, InnerArrow>;

  constructor(markup: Partial<Markup>, phMap?: Map<Nodes, InnerArrow>) {
    this.markup = markup;
    this.paragraphMap = phMap ? phMap : this.paragraph();
  }

  public invoke(
    nodeTypes: Nodes | string,
    phParamMarkup: ParagraphParamMarkup
  ): void {
    this.paragraphMap.get(nodeTypes).call(this, phParamMarkup);
  }

  private paragraph(): Map<Nodes | string, InnerArrow> {
    return new Map<Nodes | string, InnerArrow>().set(
      Nodes.TEXT,
      (param: ParagraphParamMarkup) => this.text(param)
    );
  }

  private commit(key: any, paragraph: ParagraphParamMarkup): string[] {
    if (paragraph.para !== '') {
      if (
        paragraph.styleCache[paragraph.currStyle] == null &&
        paragraph.currStyle !== 0
      ) {
        paragraph.styleCache[paragraph.currStyle] = {};
        // paragraph?.fontSetStyle.invoke(
        //   paragraph.styleCache[paragraph.currStyle],
        //   paragraph.value.styleOverrideTable[paragraph.currStyle]
        // );
      }
      const styleOverride = paragraph.styleCache[paragraph.currStyle]
        ? JSON.stringify(paragraph.styleCache[paragraph.currStyle])
        : '{}';
      let varName;

      if (paragraph.value.name.charAt(0) === '$') {
        varName = paragraph.value.name.substring(1);
      }

      if (varName) {
        paragraph.para = `
          <ng-container *ngIf="props?.${varName}">{{props.${varName}}}</ng-container>
          <ng-container *ngIf="!props?.${varName}">${paragraph.para}</ng-container>
          `;
      }
      paragraph.ps.push(
        `<span [ngStyle]="${styleOverride.replace(/"/g, "'")}" key="${key}">${
          paragraph.para
        }</span>`
      );
      paragraph.para = '';
    }
    return paragraph.ps;
  }

  private text(paragraph: ParagraphParamMarkup) {
    if (paragraph.value.name.substring(0, 6) === 'input:') {
      paragraph.content = [
        `<input key="${paragraph.value.id}"` +
          `type="text" placeholder="${paragraph.value.characters}"` +
          ` name="${paragraph.value.name.substring(7)}" />`,
      ];
    } else if (paragraph.value.characterStyleOverrides) {
      for (const i in paragraph.value.characters) {
        let idx = paragraph.value.characterStyleOverrides[i];
        if (paragraph.value.characters[i] === '\n') {
          paragraph.content = this.commit(i, paragraph);
          paragraph.ps.push(`<br key="${`br${i}`}" />`);
          continue;
        }

        if (idx == null) {
          idx = 0;
        }

        if (idx !== paragraph.currStyle) {
          paragraph.content = this.commit(i, paragraph);
          paragraph.currStyle = idx;
        }
        paragraph.para += paragraph.value.characters[i];
      }
      paragraph.content = this.commit('end', paragraph);
    } else {
      paragraph.content = paragraph.value.characters
        .split('\n')
        .map((line: any, idx: any) => `<div key="${idx}">${line}</div>`);
    }
  }
}
