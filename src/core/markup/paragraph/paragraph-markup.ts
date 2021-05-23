import { NodeTypes } from '../../api';
import { ParagraphSetMarkup } from './paragraph-set-markup';
import { ParagraphParamMarkup } from './paragraph-param-markup';
import { Markup } from '../markup';

export class ParagraphMarkup implements ParagraphSetMarkup {

    public markup: Partial<Markup>;
    private phMap: Map<NodeTypes, string>;

    constructor(markup: Partial<Markup>, phMap?: Map<NodeTypes, string>) {
        this.markup = markup;
        this.phMap = phMap ? phMap : this.paragraph();
    }

    public set(bgEnum: NodeTypes, phParamMarkup: ParagraphParamMarkup): void {
        const key = this.phMap.get(bgEnum);
        key && this[key](phParamMarkup);
    }

    private paragraph(): Map<NodeTypes, string> {
        const phMap = new Map();
        phMap.set(NodeTypes.TEXT, 'text');
        return phMap;
    }

    private commit(key: any, phPMp: ParagraphParamMarkup): void {

        if (phPMp.para !== '') {

            if (phPMp.styleCache[phPMp.currStyle] == null && phPMp.currStyle !== 0) {
                phPMp.styleCache[phPMp.currStyle] = {};
                phPMp?.fontSetStyle.set(phPMp.styleCache[phPMp.currStyle],
                    phPMp.value.styleOverrideTable[phPMp.currStyle]);
            }
            const styleOverride = phPMp.styleCache[phPMp.currStyle] ?
                JSON.stringify(phPMp.styleCache[phPMp.currStyle]) : '{}';
            let varName;

            if (phPMp.value.name.charAt(0) === '$') {
                varName = phPMp.value.name.substring(1);
            }

            if (varName) {
                phPMp.para = `
                    <ng-container *ngIf="props?.${varName}">{{props.${varName}}}</ng-container>
                    <ng-container *ngIf="!props?.${varName}">${phPMp.para}</ng-container>
                    `;
            }
            phPMp.ps.push(`<span [ngStyle]="${styleOverride.replace(/"/g, "'")}" key="${key}">${phPMp.para}</span>`);
            phPMp.para = '';
        }
    }

    private text(phPMp: ParagraphParamMarkup) {

        if (phPMp.value.name.substring(0, 6) === 'input:') {
            phPMp.content = [`<input key="${phPMp.value.id}"` +
                             `type="text" placeholder="${phPMp.value.characters}"` +
                             ` name="${phPMp.value.name.substring(7)}" />`];

        } else if (phPMp.value.characterStyleOverrides) {
            phPMp.para = '';
            phPMp.ps = [];
            phPMp.styleCache = {};
            phPMp.currStyle = 0;

            for (const i in phPMp.value.characters) {
                let idx = phPMp.value.characterStyleOverrides[i];

                if (phPMp.value.characters[i] === '\n') {
                    this.commit(i, phPMp);
                    phPMp.ps.push(`<br key="${`br${i}`}" />`);
                    continue;
                }

                if (idx == null) {
                    idx = 0;
                }

                if (idx !== phPMp.currStyle) {
                    this.commit(i, phPMp);
                    phPMp.currStyle = idx;
                }
                phPMp.para += phPMp.value.characters[i];
            }
            this.commit('end', phPMp);
            phPMp.content = phPMp.ps;
        } else {
            phPMp.content = phPMp.value.characters
                                       .split("\n")
                                       .map((line: any, idx: any) => `<div key="${idx}">${line}</div>`);
        }
    }
}