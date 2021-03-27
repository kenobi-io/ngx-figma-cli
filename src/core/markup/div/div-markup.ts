import { Markup } from '../markup';
import { DivParamMarkup } from './div-param-markup';
import { DivSetMarkup } from './div-set-markup';
import { Characters, NodeTypes } from '../../api';

export class DivMarkup implements DivSetMarkup {

    public markup: Partial<Markup>;
    private divMap: Map<NodeTypes | Characters, Function>;

    constructor(markup: Partial<Markup>) {
        this.markup = markup;
        this.div();
    }

    public set(nodeTypes: NodeTypes | Characters, divPMp: DivParamMarkup): void {
        let func;

        if (divPMp.parent != null) {
            func = this.divMap.get(Characters.PARENT_START);
            func && func(divPMp);
        }

        if (nodeTypes === NodeTypes.VECTOR) {
            func = this.divMap.get(nodeTypes);
            func && func(divPMp);
        } else {
            const hash = (value: { id: any; name: string; }, component: { id: any; }) => {
                if (value.id !== component.id && value.name.charAt(0) === '#') {
                    return Characters.HASH;
                } else {
                    return Characters.DEFAULT;
                }
            }
            const res = hash(divPMp.value, divPMp.component);
            func = this.divMap.get(res);
            func && func(divPMp);
        }

        if (divPMp.parent != null) {
            func = this.divMap.get(Characters.PARENT_END);
            func && func(divPMp);
        }

    }

    private div() {
        this.divMap = new Map();
        this.divMap.set(Characters.PARENT_START, this.parentStart);
        this.divMap.set(Characters.HASH, this.chartAtHash);
        this.divMap.set(NodeTypes.VECTOR, this.vector);
        this.divMap.set(Characters.DEFAULT, this.default);
        this.divMap.set(Characters.PARENT_END, this.parentEnd);
    }

    private parentStart(divPMp: DivParamMarkup) {
        this.print(divPMp);
    }

    private parentEnd(divPMp: DivParamMarkup) {
        if (this.markup.print) {
            this.markup.print(`  </div>`, divPMp.indent);
            this.markup.print(`</div>`, divPMp.indent);
        }
    }

    private chartAtHash(divPMp: DivParamMarkup) {
        const nodeName = divPMp.value.name.replace(/\W+/g, '');
        // TODO: parse props
        divPMp.nodeName = `app-C${nodeName}`;
        this.print(divPMp);
        divPMp.createComponent(divPMp.value, divPMp.imgMap, divPMp.componentMap);
    }

    private print(divPMp: DivParamMarkup): void {
        if (this.markup.print) {
            this.markup.print(`<div [ngStyle]="${JSON.stringify(divPMp.outerStyle).replace(/"/g, "'")}" 
                                    class="${divPMp.outerClass.replace(/"/g, "'")}">`, divPMp.indent);
            if (divPMp.nodeName !== 'div') {
                this.markup.print(`  <${divPMp.nodeName} [props]="props"`, divPMp.indent);
            } else {
                this.markup.print(`  <div`, divPMp.indent);
            }
            this.markup.print(`    id="${divPMp.value.id}"`, divPMp.indent);
            this.markup.print(`    [ngStyle]="${JSON.stringify(divPMp.styles).replace(/"/g, "'")}"`, divPMp.indent);
            this.markup.print(`    class="${divPMp.innerClass}"`, divPMp.indent);
            this.markup.print(`  >`, divPMp.indent);
            if (divPMp.nodeName !== 'div') {
                this.markup.print(`</${divPMp.nodeName}>`, '')
                this.markup.print(`</div>`, '')
            }
        }
    }

    private vector(divPMp: DivParamMarkup) {
        if (this.markup.print) {
            this.markup.print(`<div class="vector">${divPMp.imgMap[divPMp.value.id]}</div>`, divPMp.indent);
        }
    }

    private default(divPMp: DivParamMarkup) {

        if (this.markup.print) {

            const newNodeBounds = divPMp.value.absoluteBoundingBox;
            const newLastVertical = newNodeBounds && newNodeBounds.y + newNodeBounds.height;
            this.markup.print(`    <div>`, divPMp.indent);
            let first = true;

            for (const child of divPMp.minChildren) {
                divPMp.visitNode(child, divPMp.value, first ? null : newLastVertical, divPMp.indent + '      ');
                first = false;
            }

            for (const child of divPMp.centerChildren) { 
                divPMp.visitNode(child, divPMp.value, null, divPMp.indent + '      ');
            }

            if (divPMp.maxChildren.length > 0) {
                divPMp.outerClass += ' maxer';
                divPMp.styles.width = '100%';
                divPMp.styles.pointerEvents = 'none';
                divPMp.styles.backgroundColor = null;
                divPMp.indent += '      ';
                this.print(divPMp);
                first = true;
                for (const child of divPMp.maxChildren) {
                    divPMp.visitNode(child, divPMp.value, first ? null : newLastVertical, divPMp.indent + '          ');
                    first = false;
                }
                
                this.markup.print(`        </div>`, divPMp.indent);
                this.markup.print(`      </div>`, divPMp.indent);
            }

            if (divPMp.content != null) {
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
}

