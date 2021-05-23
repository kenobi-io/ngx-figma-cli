import { FontSetStyle } from './font-set-style';
import { FontParamStyle } from './font-param-style';
import { NodeTypes } from '../../api';
import { Style } from '../style';
export class FontStyle implements FontSetStyle {

    public style: Partial<Style>;
    private fontMap: Map<NodeTypes, string>;

    constructor(style: Partial<Style>, fontMap?: Map<NodeTypes, string>) {
        this.style = style;
        this.fontMap = fontMap ? fontMap : this.font();
    }

    public set(nodeTypeEnum: NodeTypes, fontParamStyle: FontParamStyle): void {
        const key = this.fontMap.get(nodeTypeEnum);
        key && this[key](fontParamStyle);
    }

    private font() {
        const fontMap = new Map();
        fontMap.set(NodeTypes.TEXT, 'text');
        return fontMap;
    }

    public text(pf: FontParamStyle) {
        this.style.fontSize = pf.value.fontSize + 'px';
        this.style.fontWeight = `${pf.value.fontWeight}px`;
        this.style.fontFamily = pf.value.fontFamily;
        this.style.textAlign = pf.value.textAlignHorizontal;
        this.style.fontStyle = pf.value.italic ? 'italic' : 'normal';
        this.style.lineHeight = `${pf.value.lineHeightPercent * 1.25}%`;
        this.style.letterSpacing = `${pf.value.letterSpacing}px`;
    }
}
