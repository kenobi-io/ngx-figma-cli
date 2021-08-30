import { Nodes } from '../../api';
import { ParagraphSetMarkup } from './paragraph-set-markup';
import { ParagraphParamMarkup } from './paragraph-param-markup';
import { Markup } from '../markup';
import { InnerArrow } from 'src/core/inner-arrow';

export class ParagraphMarkup implements ParagraphSetMarkup {
  public markup: Partial<Markup>;
  private paragraphMap: Map<Nodes, InnerArrow>;

  constructor(markup: Partial<Markup>, phMap?: Map<Nodes, InnerArrow>) {
    this.markup = markup;
    this.paragraphMap = phMap ? phMap : this.paragraph();
  }

  public invoke(nodeTypes: Nodes, phParamMarkup: ParagraphParamMarkup): void {
    this.paragraphMap.get(nodeTypes).call(this, phParamMarkup);
  }

  private paragraph(): Map<Nodes, InnerArrow> {
    return new Map<Nodes, InnerArrow>().set(
      Nodes.TEXT,
      (param: ParagraphParamMarkup) => this.text(param)
    );
  }

  private commit(
    key: any,
    para,
    ps,
    styleCache,
    currStyle,
    paragraph: ParagraphParamMarkup
  ): [] {
    if (para !== '') {
      if (styleCache[currStyle] == null && currStyle !== 0) {
        styleCache[currStyle] = {};
        paragraph?.fontSetStyle.invoke(
          styleCache[currStyle],
          paragraph.value.styleOverrideTable[currStyle]
        );
      }
      const styleOverride = styleCache[currStyle]
        ? JSON.stringify(styleCache[currStyle])
        : '{}';
      let varName;

      if (paragraph.value.name.charAt(0) === '$') {
        varName = paragraph.value.name.substring(1);
        console.log('varName: ', varName);
      }

      if (varName) {
        para = `
          <ng-container *ngIf="props?.${varName}">{{props.${varName}}}</ng-container>
          <ng-container *ngIf="!props?.${varName}">${para}</ng-container>
          `;
      }
      ps.push(
        `<span [ngStyle]="${styleOverride.replace(
          /"/g,
          "'"
        )}" key="${key}">${para}</span>`
      );
      console.log('ps: ', ps.length);
      para = '';
    }
    return ps;
  }

  private text(paragraph: ParagraphParamMarkup) {
    if (paragraph.value.name.substring(0, 6) === 'input:') {
      console.log('content: if input');
      paragraph.content = [
        `<input key="${paragraph.value.id}"` +
          `type="text" placeholder="${paragraph.value.characters}"` +
          ` name="${paragraph.value.name.substring(7)}" />`,
      ];
    } else if (paragraph.value.characterStyleOverrides) {
      let para = '';
      let ps = [];
      let styleCache = {};
      let currStyle = 0;

      for (const i in paragraph.value.characters) {
        let idx = paragraph.value.characterStyleOverrides[i];
        if (paragraph.value.characters[i] === '\n') {
          paragraph.content = this.commit(
            i,
            para,
            ps,
            styleCache,
            currStyle,
            paragraph
          );
          ps.push(`<br key="${`br${i}`}" />`);
          continue;
        }

        if (idx == null) {
          idx = 0;
        }

        if (idx !== currStyle) {
          paragraph.content = this.commit(
            i,
            para,
            ps,
            styleCache,
            currStyle,
            paragraph
          );
          currStyle = idx;
        }
        para += paragraph.value.characters[i];
      }
      paragraph.content = this.commit(
        'end',
        para,
        ps,
        styleCache,
        currStyle,
        paragraph
      );
      console.log('content: characterStyleOverrides');
      // paragraph.content = paragraph.ps;
    } else {
      console.log('content: else');
      paragraph.content = paragraph.value.characters
        .split('\n')
        .map((line: any, idx: any) => `<div key="${idx}">${line}</div>`);
    }
    // console.log('content: ', paragraph.content);
  }
}
