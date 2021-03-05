import { Style } from "../style";
import { LayoutParamStyle } from "./layout-param-style";
import { LayoutSetStyle } from "./layout-set-style";
import { LayoutConstraint } from '../../api';
export class LayoutStyle implements LayoutSetStyle {


    public style: Partial<Style>;
    private layoutMap: Map<LayoutConstraint | string, Function>;

    constructor(style: Partial<Style>) {
        this.style = style;
        this.layout();
    }

    public set(layoutConstraint: LayoutConstraint, layoutParamStyle: LayoutParamStyle): void {
        if (layoutConstraint) {
            const func = this.layoutMap.get(layoutConstraint);
            func && func(layoutParamStyle);
        }
    }

    private layout() {
        this.layoutMap = new Map();
        this.layoutMap.set(LayoutConstraint.LEFT_RIGHT,
            this.leftRight);
        this.layoutMap.set(LayoutConstraint.LEFT,
            this.left);
        this.layoutMap.set(LayoutConstraint.RIGHT,
            this.right);
        this.layoutMap.set(LayoutConstraint.SCALE,
            this.scale);
        this.layoutMap.set(LayoutConstraint.CENTER,
            this.center);
        this.layoutMap.set(LayoutConstraint.TOP_BOTTOM,
            this.bottomTop);
        this.layoutMap.set(LayoutConstraint.BOTTOM,
            this.bottom);
        this.layoutMap.set(LayoutConstraint.TOP,
            this.top);
    }

    private leftRight(lps: LayoutParamStyle) {
        if (lps.value) {
            this.style.marginLeft = lps.value.left + 'px';
            this.style.marginRight = lps.value.right + 'px';
            this.style.flexGrow = '1';
        }
    }
    private left(lps: LayoutParamStyle) {
        if (lps.value) {
            this.style.marginLeft = lps.value.left + 'px';
            this.style.width = lps.value.width + 'px';
            this.style.minWidth = lps.value.width + 'px';
        }
    }
    private right(lps: LayoutParamStyle) {
        lps.outerStyle.justifyContent = 'flex-end';
        if (lps.value) {
            this.style.marginRight = lps.value.right + 'px';
            this.style.width = lps.value.width + 'px';
            this.style.minWidth = lps.value.width + 'px';
        }
    }

    private scale(lps: LayoutParamStyle) {
        //  ver
        lps.outerClass += ' centerer';
        if (lps.value) {
            this.style.height = lps.value.height && lps.value.height + 'px';
            const parentHeight = Number.parseFloat(lps.value.top) +
                Number.parseFloat(lps.value.height) +
                Number.parseFloat(lps.value.bottom);
            this.style.height =
                `${Number.parseFloat(lps.value.height) * 100 / parentHeight}%`;
            this.style.top =
                `${Number.parseFloat(lps.value.top) * 100 / parentHeight}%`;
            this.style.top = lps.value.top + 'px';

        }

        // hor
        if (lps.value) {
            const parentWidth = Number.parseFloat(lps.value.left) +
                Number.parseFloat(lps.value.width) +
                Number.parseFloat(lps.value.right);
            this.style.width = `${Number.parseFloat(lps.value.width) * 100 / parentWidth}%`;
            this.style.marginLeft = `${Number.parseFloat(lps.value.left) * 100 / parentWidth}%`;
        }
    }
    private center(lps: LayoutParamStyle) {
        // ver
        lps.outerClass += ' centerer';
        lps.outerStyle.alignItems = 'center';

        if (lps.value) {
            this.style.height = lps.value.height && lps.value.height + 'px';
            this.style.marginTop =
                `${Number.parseFloat(lps.value.top)
                - Number.parseFloat(lps.value.bottom)}`;
            this.style.marginTop += 'px';;
        }
        // hor
        lps.outerStyle.justifyContent = 'center';
        if (lps.value) {
            this.style.width = lps.value.width + 'px';
            this.style.marginLeft = lps.value.left && lps.value.right
                ? `${Number.parseFloat(lps.value.left) - Number.parseFloat(lps.value.right)}`
                : undefined;
            this.style.marginLeft += 'px';
        }
    }
    private bottom(lps: LayoutParamStyle) {
        if (lps.value) {
            this.style.height = lps.value.height && lps.value.height + 'px';
            this.style.marginTop = lps.value.top + 'px';
            this.style.marginBottom = lps.value.bottom + 'px';
            this.style.minHeight = this.style.height;
            this.style.height = undefined;
        }
    }

    private bottomTop(lps: LayoutParamStyle) {
        lps.outerClass += ' centerer';
        if (lps.value) {
            this.style.marginTop = lps.value.top + 'px';
            this.style.marginBottom = lps.value.bottom + 'px';
        }
    }

    private top(lps: LayoutParamStyle) {
        if (lps.value) {
            this.style.height = lps.value.height && lps.value.height + 'px';
            this.style.marginTop = lps.value.top + 'px';
            this.style.marginBottom = lps.value.bottom + 'px';
            this.style.minHeight = this.style.height;
            this.style.height = undefined;
        }
    }
}

