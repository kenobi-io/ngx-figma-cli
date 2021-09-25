import { Markup } from '../markup';
import { ComponentParamMarkup, NodeParamMarkup } from './div-param-markup';
import { DivSetMarkup } from './div-set-markup';
import { Characters, Nodes } from '../../api';
import { InnerArrow } from 'src/core/inner-arrow';

export class DivMarkup implements DivSetMarkup {
  public markup: Partial<Markup>;
  public divMap: Map<Nodes | Characters, InnerArrow>;

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
    divPMp: ComponentParamMarkup
  ): void {
    const markupParam: NodeParamMarkup = {
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
      // comParamMark: divPMp,
    };
    if (parent != null) {
      this.divMap.get(Characters.PARENT_START).call(this, divPMp, markupParam);
    }
    if (node.id !== divPMp.component.id && node.name.charAt(0) === '#') {
      this.divMap.get(Characters.HASH).call(this, divPMp, markupParam);
    } else if (node.type === Nodes.VECTOR) {
      this.divMap.get(Nodes.VECTOR).call(this, divPMp, markupParam);
    } else {
      this.divMap.get(Characters.DEFAULT).call(this, divPMp, markupParam);
    }

    if (parent != null) {
      this.divMap.get(Characters.PARENT_END).call(this, divPMp, markupParam);
    }
  }

  private div(): Map<Nodes | Characters, InnerArrow> {
    const divMap = new Map();
    divMap.set(
      Characters.PARENT_START,
      (dpm: ComponentParamMarkup, markupParam: NodeParamMarkup) =>
        this.parentStart(dpm, markupParam)
    );
    divMap.set(
      Characters.HASH,
      (dpm: ComponentParamMarkup, markupParam: NodeParamMarkup) =>
        this.chartAtHash(dpm, markupParam)
    );
    divMap.set(
      Nodes.VECTOR,
      (dpm: ComponentParamMarkup, markupParam: NodeParamMarkup) =>
        this.vector(dpm, markupParam)
    );
    divMap.set(
      Characters.DEFAULT,
      (dpm: ComponentParamMarkup, markupParam: NodeParamMarkup) =>
        this.default(dpm, markupParam)
    );
    divMap.set(
      Characters.PARENT_END,
      (dpm: ComponentParamMarkup, markupParam: NodeParamMarkup) =>
        this.parentEnd(dpm, markupParam)
    );
    return divMap;
  }

  private parentStart(
    divPMp: ComponentParamMarkup,
    markupParam: NodeParamMarkup
  ) {
    this.printDiv(divPMp, markupParam);
  }

  private parentEnd(
    divPMp: ComponentParamMarkup,
    markupParam: NodeParamMarkup
  ) {
    divPMp.codeGen.print(`  </div>`, markupParam.indent);
    divPMp.codeGen.print(`</div>`, markupParam.indent);
  }

  private chartAtHash(
    divPMp: ComponentParamMarkup,
    markupParam: NodeParamMarkup
  ) {
    const nodeName = markupParam.node.name.replace(/\W+/g, '');
    // TODO: parse props
    markupParam.nodeName = `app-C${nodeName}`;
    this.printDiv(divPMp, markupParam);
    divPMp.codeGen.createComponent(
      markupParam.node,
      divPMp.imgMap,
      divPMp.componentMap,
      divPMp
    );
  }

  private printDiv(divPMp: ComponentParamMarkup, markupParam: NodeParamMarkup) {
    // printDiv(divPMp: DivParamMarkup): void {
    divPMp.codeGen.print(
      `<div [ngStyle]="${JSON.stringify(markupParam.outerStyle).replace(
        /"/g,
        "'"
      )}" class="${markupParam.outerClass.replace(/"/g, "'")}">`,
      markupParam.indent
    );
    if (markupParam.nodeName !== 'div') {
      divPMp.codeGen.print(
        `  <${markupParam.nodeName} [props]="props"`,
        markupParam.indent
      );
    } else {
      divPMp.codeGen.print(`  <div`, markupParam.indent);
    }
    divPMp.codeGen.print(`    id="${markupParam.node.id}"`, markupParam.indent);
    divPMp.codeGen.print(
      `    [ngStyle]="${JSON.stringify(markupParam.style).replace(/"/g, "'")}"`,
      markupParam.indent
    );
    divPMp.codeGen.print(
      `    class="${markupParam.innerClass}"`,
      markupParam.indent
    );
    divPMp.codeGen.print(`  >`, markupParam.indent);
    if (markupParam.nodeName !== 'div') {
      divPMp.codeGen.print(`</${markupParam.nodeName}>`, '');
      divPMp.codeGen.print(`</div>`, '');
    }
  }

  private vector(divPMp: ComponentParamMarkup, markupParam: NodeParamMarkup) {
    divPMp.codeGen.print(
      `<div class="vector">${divPMp.imgMap[markupParam.node.id]}</div>`,
      markupParam.indent
    );
  }

  private default(divPMp: ComponentParamMarkup, markupParam: NodeParamMarkup) {
    const newNodeBounds = markupParam.node.absoluteBoundingBox;
    const newLastVertical =
      newNodeBounds && newNodeBounds.y + newNodeBounds.height;
    divPMp.codeGen.print(`    <div>`, markupParam.indent);
    let first = true;

    for (const child of markupParam.minChildren) {
      divPMp.codeGen.visitNode(
        child,
        markupParam.node,
        first ? null : newLastVertical,
        markupParam.indent + '      ',
        divPMp
      );
      first = false;
    }

    for (const child of markupParam.centerChildren) {
      divPMp.codeGen.visitNode(
        child,
        markupParam.node,
        null,
        markupParam.indent + '      ',
        divPMp
      );
    }

    if (markupParam.maxChildren.length > 0) {
      markupParam.outerClass += ' maxer';
      markupParam.style.width = '100%';
      markupParam.style.pointerEvents = 'none';
      markupParam.style.backgroundColor = null;
      markupParam.indent += '      ';
      this.printDiv(divPMp, markupParam);
      first = true;

      for (const child of markupParam.maxChildren) {
        divPMp.codeGen.visitNode(
          child,
          markupParam.node,
          first ? null : newLastVertical,
          markupParam.indent + '          ',
          divPMp
        );
        first = false;
      }
      divPMp.codeGen.print(`        </div>`, markupParam.indent);
      divPMp.codeGen.print(`      </div>`, markupParam.indent);
    }
    if (markupParam.content != null) {
      if (markupParam.node.name.charAt(0) === '$') {
        // const varName = divPMp.value.name.substring(1);
        for (const piece of markupParam.content) {
          divPMp.codeGen.print(piece, markupParam.indent + '        ');
        }
      } else {
        for (const piece of markupParam.content) {
          divPMp.codeGen.print(piece, markupParam.indent + '      ');
        }
      }
    }
    divPMp.codeGen.print(`    </div>`, markupParam.indent);
  }
}

export function markup<T extends Partial<Markup>>(
  model: T,
  property: Partial<NodeParamMarkup>,
  divMarkup: (model: T, property: Partial<NodeParamMarkup>) => void,
  createNode: (node, parent, lastVertical, indent) => void
) {
  const newNodeBounds = property.node.absoluteBoundingBox;
  const newLastVertical =
    newNodeBounds && newNodeBounds.y + newNodeBounds.height;
  model.append(`    <div>`, property.indent);
  let first = true;

  for (const child of property.minChildren) {
    createNode(
      child,
      property.node,
      first ? null : newLastVertical,
      property.indent + '      '
    );
    first = false;
  }

  for (const child of property.centerChildren) {
    createNode(child, property.node, null, property.indent + '      ');
  }

  if (property.maxChildren.length > 0) {
    property.outerClass += ' maxer';
    property.style.width = '100%';
    property.style.pointerEvents = 'none';
    property.style.backgroundColor = null;
    property.indent += '      ';
    divMarkup(model, property);
    first = true;

    for (const child of property.maxChildren) {
      createNode(
        child,
        property.node,
        first ? null : newLastVertical,
        property.indent + '          '
      );
      first = false;
    }
    model.append(`        </div>`, property.indent);
    model.append(`      </div>`, property.indent);
  }
  if (property.content != null) {
    if (property.node.name.charAt(0) === '$') {
      for (const piece of property.content) {
        model.append(piece, property.indent + '        ');
      }
    } else {
      for (const piece of property.content) {
        model.append(piece, property.indent + '      ');
      }
    }
  }
  model.append(`    </div>`, property.indent);
}

export function vectorMarkup<T extends Partial<Markup>>(
  model: T,
  property: Partial<NodeParamMarkup>
) {
  model.append(
    `<div class="vector">${model.imgMap[property.node.id]}</div>`,
    property.indent
  );
}

export function divMarkup<T extends Partial<Markup>>(
  model: T,
  property: Partial<NodeParamMarkup>
) {
  model.append(
    `<div [ngStyle]="${JSON.stringify(property.outerStyle).replace(
      /"/g,
      "'"
    )}" class="${property.outerClass.replace(/"/g, "'")}">`,
    property.indent
  );
  if (property.nodeName !== 'div') {
    model.append(`  <${property.nodeName} [props]="props"`, property.indent);
  } else {
    model.append(`  <div`, property.indent);
  }
  model.append(`    id="${property.node.id}"`, property.indent);
  model.append(
    `    [ngStyle]="${JSON.stringify(property.style).replace(/"/g, "'")}"`,
    property.indent
  );
  model.append(`    class="${property.innerClass}"`, property.indent);
  model.append(`  >`, property.indent);
  if (property.nodeName !== 'div') {
    model.append(`</${property.nodeName}>`, '');
    model.append(`</div>`, '');
  }
}

export function byHashMarkup<T extends Partial<Markup>>(
  model: T,
  property: Partial<NodeParamMarkup>,
  divMarkup: (model: T, property: Partial<NodeParamMarkup>) => void,
  createComponent: (child, images: [], componentMap) => void
) {
  const nodeName = property.node.name.replace(/\W+/g, '');
  property.nodeName = `app-C${nodeName}`;
  divMarkup(model, property);
  createComponent(property.node, model.imgMap, model.componentMap);
}
