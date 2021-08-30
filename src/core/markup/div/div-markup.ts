import { Markup } from '../markup';
import { DivParamMarkup } from './div-param-markup';
import { DivSetMarkup } from './div-set-markup';
import { Characters, Nodes } from '../../api';
import { InnerArrow } from 'src/core/inner-arrow';

export class DivMarkup implements DivSetMarkup {
  public markup: Partial<Markup>;
  private divMap: Map<Nodes | Characters, InnerArrow>;

  constructor(
    markup: Partial<Markup>,
    divMap?: Map<Nodes | Characters, InnerArrow>
  ) {
    this.markup = markup;
    this.divMap = divMap ? divMap : this.div();
  }

  public invoke(divMarkupes: Nodes | Characters, divPMp: DivParamMarkup): void {
    if (divPMp.parent != null) {
      this.divMap.get(Characters.PARENT_START).call(this, divPMp);
    }
    if (
      divPMp.value.id !== divPMp.component.id &&
      divPMp.value.name.charAt(0) === '#'
    ) {
      this.divMap.get(Characters.HASH).call(this, divPMp);
    } else if (divMarkupes === Nodes.VECTOR) {
      console.log('divMarkupes: VECTOR');
      this.divMap.get(divMarkupes).call(this, divPMp);
    } else {
      this.divMap.get(Characters.DEFAULT).call(this, divPMp);
    }

    if (divPMp.parent != null) {
      this.divMap.get(Characters.PARENT_END).call(this, divPMp);
    }
  }

  private div(): Map<Nodes | Characters, InnerArrow> {
    const divMap = new Map();
    divMap.set(Characters.PARENT_START, (param: DivParamMarkup) =>
      this.parentStart(param)
    );
    divMap.set(Characters.HASH, (param: DivParamMarkup) =>
      this.chartAtHash(param)
    );
    divMap.set(Nodes.VECTOR, (param: DivParamMarkup) => this.vector(param));
    divMap.set(Characters.DEFAULT, (param: DivParamMarkup) =>
      this.default(param)
    );
    divMap.set(Characters.PARENT_END, (param: DivParamMarkup) =>
      this.parentEnd(param)
    );
    return divMap;
  }

  private parentStart(divPMp: DivParamMarkup) {
    this.printDiv(divPMp);
  }

  private parentEnd(divPMp: DivParamMarkup) {
    this.markup.print(`  </div>`, divPMp.indent);
    this.markup.print(`</div>`, divPMp.indent);
  }

  private chartAtHash(divPMp: DivParamMarkup) {
    const nodeName = divPMp.value.name.replace(/\W+/g, '');
    // TODO: parse props
    divPMp.nodeName = `app-C${nodeName}`;
    this.printDiv(divPMp);
    divPMp.codeGen.createComponent(
      divPMp.value,
      divPMp.imgMap,
      divPMp.componentMap,
      divPMp
    );
  }

  private printDiv(divPMp: DivParamMarkup): void {
    console.log('printDiv: ', divPMp.outerStyle);
    this.markup.print(
      `<div [ngStyle]="${JSON.stringify(divPMp.outerStyle).replace(/"/g, "'")}" 
                                    class="${divPMp.outerClass.replace(
                                      /"/g,
                                      "'"
                                    )}">`,
      divPMp.indent
    );
    if (divPMp.nodeName !== 'div') {
      this.markup.print(`  <${divPMp.nodeName} [props]="props"`, divPMp.indent);
    } else {
      this.markup.print(`  <div`, divPMp.indent);
    }
    this.markup.print(`    id="${divPMp.value.id}"`, divPMp.indent);
    this.markup.print(
      `    [ngStyle]="${JSON.stringify(divPMp.style).replace(/"/g, "'")}"`,
      divPMp.indent
    );
    this.markup.print(`    class="${divPMp.innerClass}"`, divPMp.indent);
    this.markup.print(`  >`, divPMp.indent);
    if (divPMp.nodeName !== 'div') {
      this.markup.print(`</${divPMp.nodeName}>`, '');
      this.markup.print(`</div>`, '');
    }
  }

  private vector(divPMp: DivParamMarkup) {
    this.markup.print(
      `<div class="vector">${divPMp.imgMap[divPMp.value.id]}</div>`,
      divPMp.indent
    );
  }

  private default(divPMp: DivParamMarkup) {
    const newNodeBounds = divPMp.value.absoluteBoundingBox;
    const newLastVertical =
      newNodeBounds && newNodeBounds.y + newNodeBounds.height;
    this.markup.print(`    <div>`, divPMp.indent);
    let first = true;

    for (const child of divPMp.minChildren) {
      // console.log('visitNode minChildren: ', divPMp.minChildren.length);
      divPMp.codeGen.visitNode(
        child,
        divPMp.value,
        first ? null : newLastVertical,
        divPMp.indent + '      ',
        divPMp
      );
      first = false;
    }

    for (const child of divPMp.centerChildren) {
      // console.log('visitNode centerChildren: ', divPMp.centerChildren.length);
      divPMp.codeGen.visitNode(
        child,
        divPMp.value,
        null,
        divPMp.indent + '      ',
        divPMp
      );
    }

    if (divPMp.maxChildren.length > 0) {
      divPMp.outerClass += ' maxer';
      divPMp.style.width = '100%';
      divPMp.style.pointerEvents = 'none';
      divPMp.style.backgroundColor = null;
      divPMp.indent += '      ';
      this.printDiv(divPMp);
      first = true;

      for (const child of divPMp.maxChildren) {
        console.log(
          'visitNode divPMp.maxChildren: ',
          divPMp.maxChildren.length
        );
        divPMp.codeGen.visitNode(
          child,
          divPMp.value,
          first ? null : newLastVertical,
          divPMp.indent + '          ',
          divPMp
        );
        first = false;
      }
      this.markup.print(`        </div>`, divPMp.indent);
      this.markup.print(`      </div>`, divPMp.indent);
    }
    if (divPMp.content != null) {
      console.log('content: != null');
      if (divPMp.value.name.charAt(0) === '$') {
        const varName = divPMp.value.name.substring(1);
        for (const piece of divPMp.content) {
          this.markup.print(piece, divPMp.indent + '        ');
        }
      } else {
        for (const piece of divPMp.content) {
          this.markup.print(piece, divPMp.indent + '      ');
        }
      }
    }
    this.markup.print(`    </div>`, divPMp.indent);
  }
}
