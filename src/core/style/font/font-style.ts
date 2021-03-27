import { FontSetStyle } from './font-set-style';
import { FontParamStyle } from './font-param-style';
import { NodeTypes } from '../../api';
import { Style } from '../style';
export class FontStyle implements FontSetStyle {

    public style: Partial<Style>;
    private fontMap: Map<NodeTypes, Function>;

    constructor(style: Partial<Style>) {
        this.style = style;
        this.font();
    }

    public set(nodeTypeEnum: NodeTypes, fontParamStyle: FontParamStyle): void {
        if (nodeTypeEnum) {
            const func = this.fontMap.get(nodeTypeEnum);
            func && func(fontParamStyle);
        }
    }

    private font() {
        this.fontMap = new Map();
        this.fontMap.set(NodeTypes.TEXT, this.text);
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
