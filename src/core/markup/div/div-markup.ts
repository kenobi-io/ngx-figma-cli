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

  public invoke(
    node,
    parent,
    content,
    styles,
    outerStyle,
    outerClass,
    innerClass,
    minChildren,
    centerChildren,
    maxChildren,
    indent,
    divPMp: DivParamMarkup
  ): void {
    const markuparam = {
      node,
      parent,
      content,
      style: styles,
      outerStyle,
      outerClass,
      innerClass,
      minChildren,
      centerChildren,
      maxChildren,
      nodeName: 'div',
      indent,
    };
    console.log('interation nodes type: ', node.type);
    if (parent != null) {
      console.log('PARENT_START');
      this.divMap.get(Characters.PARENT_START).call(this, divPMp, markuparam);
    }
    if (node.id !== divPMp.component.id && node.name.charAt(0) === '#') {
      console.log('Characters.HASH');
      this.divMap.get(Characters.HASH).call(this, divPMp, markuparam);
    } else if (node.type === 'VECTOR') {
      console.log('VECTOR');
      this.divMap.get(Nodes.VECTOR).call(this, divPMp, markuparam);
    } else {
      console.log('Characters.DEFAULT');
      this.divMap.get(Characters.DEFAULT).call(this, divPMp, markuparam);
    }

    if (parent != null) {
      console.log('Characters.PARENT_END');
      this.divMap.get(Characters.PARENT_END).call(this, divPMp, markuparam);
    }
    return;
  }

  private div(): Map<Nodes | Characters, InnerArrow> {
    const divMap = new Map();
    divMap.set(Characters.PARENT_START, (dpm: DivParamMarkup, markuparam) =>
      this.parentStart(dpm, markuparam)
    );
    divMap.set(Characters.HASH, (dpm: DivParamMarkup, markuparam) =>
      this.chartAtHash(dpm, markuparam)
    );
    divMap.set(Nodes.VECTOR, (dpm: DivParamMarkup, markuparam) =>
      this.vector(dpm, markuparam)
    );
    divMap.set(Characters.DEFAULT, (dpm: DivParamMarkup, markuparam) =>
      this.default(dpm, markuparam)
    );
    divMap.set(Characters.PARENT_END, (dpm: DivParamMarkup, markuparam) =>
      this.parentEnd(dpm, markuparam)
    );
    return divMap;
  }

  private parentStart(divPMp: DivParamMarkup, markuparam) {
    this.printDiv(divPMp, markuparam);
  }

  private parentEnd(divPMp: DivParamMarkup, markuparam) {
    divPMp.codeGen.print(`  </div>`, markuparam.indent);
    divPMp.codeGen.print(`</div>`, markuparam.indent);
  }

  private chartAtHash(divPMp: DivParamMarkup, markuparam) {
    const nodeName = markuparam.node.name.replace(/\W+/g, '');
    // TODO: parse props
    markuparam.nodeName = `app-C${nodeName}`;
    this.printDiv(divPMp, markuparam);
    divPMp.codeGen.createComponent(
      markuparam.node,
      divPMp.imgMap,
      divPMp.componentMap,
      divPMp
    );
  }

  private printDiv(divPMp, markuparam) {
    // printDiv(divPMp: DivParamMarkup): void {
    divPMp.codeGen.print(
      `<div [ngStyle]="${JSON.stringify(markuparam.outerStyle).replace(
        /"/g,
        "'"
      )}" class="${markuparam.outerClass.replace(/"/g, "'")}">`,
      markuparam.indent
    );
    if (markuparam.nodeName !== 'div') {
      divPMp.codeGen.print(
        `  <${markuparam.nodeName} [props]="props"`,
        markuparam.indent
      );
    } else {
      divPMp.codeGen.print(`  <div`, markuparam.indent);
    }
    divPMp.codeGen.print(`    id="${markuparam.node.id}"`, markuparam.indent);
    divPMp.codeGen.print(
      `    [ngStyle]="${JSON.stringify(markuparam.style).replace(/"/g, "'")}"`,
      markuparam.indent
    );
    divPMp.codeGen.print(
      `    class="${markuparam.innerClass}"`,
      markuparam.indent
    );
    divPMp.codeGen.print(`  >`, markuparam.indent);
    if (markuparam.nodeName !== 'div') {
      divPMp.codeGen.print(`</${markuparam.nodeName}>`, '');
      divPMp.codeGen.print(`</div>`, '');
    }
  }

  private vector(divPMp: DivParamMarkup, markuparam) {
    divPMp.codeGen.print(
      `<div class="vector">${divPMp.imgMap[markuparam.node.id]}</div>`,
      markuparam.indent
    );
  }

  private default(divPMp: DivParamMarkup, markuparam) {
    const newNodeBounds = markuparam.node.absoluteBoundingBox;
    const newLastVertical =
      newNodeBounds && newNodeBounds.y + newNodeBounds.height;
    divPMp.codeGen.print(`    <div>`, markuparam.indent);
    let first = true;

    for (const child of markuparam.minChildren) {
      divPMp.codeGen.visitNode(
        child,
        markuparam.node,
        first ? null : newLastVertical,
        markuparam.indent + '      ',
        divPMp
      );
      first = false;
    }

    for (const child of markuparam.centerChildren) {
      divPMp.codeGen.visitNode(
        child,
        markuparam.node,
        null,
        markuparam.indent + '      ',
        divPMp
      );
    }

    if (markuparam.maxChildren.length > 0) {
      console.log('ELSE if (maxChildren.length > 0), printDiv visitNode');
      markuparam.outerClass += ' maxer';
      markuparam.style.width = '100%';
      markuparam.style.pointerEvents = 'none';
      markuparam.style.backgroundColor = null;
      markuparam.indent += '      ';
      this.printDiv(divPMp, markuparam);
      first = true;

      for (const child of markuparam.maxChildren) {
        divPMp.codeGen.visitNode(
          child,
          markuparam.n9de,
          first ? null : newLastVertical,
          markuparam.indent + '          ',
          divPMp
        );
        first = false;
      }
      divPMp.codeGen.print(`        </div>`, markuparam.indent);
      divPMp.codeGen.print(`      </div>`, markuparam.indent);
    }
    if (markuparam.content != null) {
      if (markuparam.node.name.charAt(0) === '$') {
        console.log('ELSE if (content != null), for (const piece of content)');
        // const varName = divPMp.value.name.substring(1);
        for (const piece of markuparam.content) {
          divPMp.codeGen.print(piece, markuparam.indent + '        ');
        }
      } else {
        console.log('ELSE else, for (const piece of content)');
        for (const piece of markuparam.content) {
          divPMp.codeGen.print(piece, markuparam.indent + '      ');
        }
      }
    }
    console.log('ELSE end, print');
    divPMp.codeGen.print(`    </div>`, markuparam.indent);
  }
}
