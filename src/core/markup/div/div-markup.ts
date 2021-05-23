import { Markup } from '../markup';
import { DivParamMarkup } from './div-param-markup';
import { DivSetMarkup } from './div-set-markup';
import { Characters, NodeTypes } from '../../api';

export class DivMarkup implements DivSetMarkup {
    public markup: Partial<Markup>;
    private divMap: Map<NodeTypes | Characters, string>;

    constructor(markup: Partial<Markup>, divMap?: Map<NodeTypes | Characters, string>) {
        this.markup = markup;
        this.divMap = divMap ? divMap : this.div();
    }

    public set(nodeTypes: NodeTypes | Characters, divPMp: DivParamMarkup): void {
        let key;

        if (divPMp.parent != null) {
            key = this.divMap.get(Characters.PARENT_START);
            key && this[key](divPMp);
        }

        if (nodeTypes === NodeTypes.VECTOR) {
            key = this.divMap.get(nodeTypes);
            key && this[key](divPMp);
        } else {
            const hash = (value: { id: any; name: string; }, component: { id: any; }) => {

                if (value.id !== component.id && value.name.charAt(0) === '#') {
                    return Characters.HASH;
                } else {
                    return Characters.DEFAULT;
                }
            }
            const res = hash(divPMp.value, divPMp.component);
            key = this.divMap.get(res);
            key && this[key](divPMp);
        }

        if (divPMp.parent != null) {
            key = this.divMap.get(Characters.PARENT_END);
            key && this[key](divPMp);
        }

    }

    private div(): Map<NodeTypes | Characters, string> {
        const divMap = new Map();
        divMap.set(Characters.PARENT_START, 'parentStart');
        divMap.set(Characters.HASH, 'chartAtHash');
        divMap.set(NodeTypes.VECTOR, 'vector');
        divMap.set(Characters.DEFAULT, 'default');
        divMap.set(Characters.PARENT_END, 'parentEnd');
        return divMap;
    }

    private parentStart(divPMp: DivParamMarkup) {
        this.print(divPMp);
    }

    private parentEnd(divPMp: DivParamMarkup) {
        this.markup.print(`  </div>`, divPMp.indent);
        this.markup.print(`</div>`, divPMp.indent);
    }

    private chartAtHash(divPMp: DivParamMarkup) {
        const nodeName = divPMp.value.name.replace(/\W+/g, '');
        // TODO: parse props
        divPMp.nodeName = `app-C${nodeName}`;
        this.print(divPMp);
        divPMp.codeGen.createComponent(divPMp.value, divPMp.imgMap, divPMp.componentMap, divPMp);
    }

    private print(divPMp: DivParamMarkup): void {
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

    private vector(divPMp: DivParamMarkup) {
        this.markup.print(`<div class="vector">${divPMp.imgMap[divPMp.value.id]}</div>`, divPMp.indent);
    }

    private default(divPMp: DivParamMarkup) {
        const newNodeBounds = divPMp.value.absoluteBoundingBox;
        const newLastVertical = newNodeBounds && newNodeBounds.y + newNodeBounds.height;
        this.markup.print(`    <div>`, divPMp.indent);
        let first = true;

        for (const child of divPMp.minChildren) {
            divPMp.codeGen.visitNode(child, divPMp.value, first ? null : newLastVertical, divPMp.indent + '      ', divPMp);
            first = false;
        }

        for (const child of divPMp.centerChildren) {
            divPMp.codeGen.visitNode(child, divPMp.value, null, divPMp.indent + '      ', divPMp);
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
                divPMp.codeGen.visitNode(child, divPMp.value, first ? null : newLastVertical, divPMp.indent + '          ', divPMp);
                first = false;
            }
            this.markup.print(`        </div>`, divPMp.indent);
            this.markup.print(`      </div>`, divPMp.indent);
        }

        if (divPMp.content != null) {

            if (divPMp.value.name.charAt(0) === '$') {
                // const varName = divPMp.value.name.substring(1);
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

