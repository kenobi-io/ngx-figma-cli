import { Style } from "../style";
import { LayoutParamStyle } from "./layout-param-style";
import { LayoutSetStyle } from "./layout-set-style";
import { LayoutConstraints } from "../../api";
import { InnerArrow } from "src/core/inner-arrow";

export class LayoutStyle implements LayoutSetStyle {
  public style: Partial<Style>;
  private layoutMap: Map<LayoutConstraints | string, InnerArrow>;

  constructor(
    style: Partial<Style>,
    layoutMap?: Map<LayoutConstraints | string, InnerArrow>
  ) {
    this.style = style;
    this.layoutMap = layoutMap ? layoutMap : this.layout();
  }

  public invoke(
    layoutConstraint: LayoutConstraints,
    layoutParamStyle: LayoutParamStyle
  ): void {
    this.layoutMap.get(layoutConstraint).call(this, layoutParamStyle);
  }

  private layout(): Map<LayoutConstraints | string, InnerArrow> {
    return new Map()
      .set(LayoutConstraints.LEFT_RIGHT, (param: LayoutParamStyle) =>
        this.leftRight(param)
      )
      .set(LayoutConstraints.LEFT, (param: LayoutParamStyle) =>
        this.left(param)
      )
      .set(LayoutConstraints.RIGHT, (param: LayoutParamStyle) =>
        this.right(param)
      )
      .set(LayoutConstraints.SCALE, (param: LayoutParamStyle) =>
        this.scale(param)
      )
      .set(LayoutConstraints.CENTER, (param: LayoutParamStyle) =>
        this.center(param)
      )
      .set(LayoutConstraints.TOP_BOTTOM, (param: LayoutParamStyle) =>
        this.bottomTop(param)
      )
      .set(LayoutConstraints.BOTTOM, (param: LayoutParamStyle) =>
        this.bottom(param)
      )
      .set(LayoutConstraints.TOP, (param: LayoutParamStyle) => this.top(param));
  }

  private leftRight(lps: LayoutParamStyle) {
    if (lps.isVertical) {
      this.vertical(lps);
    } else {
      if (lps.value !== null) {
        this.style.marginLeft = lps.value.left + "px";
        this.style.marginRight = lps.value.right + "px";
        this.style.flexGrow = "1";
      }
    }
  }

  private left(lps: LayoutParamStyle) {
    if (lps.isVertical) {
      this.vertical(lps);
    } else {
      this.horizontal(lps);
    }
  }

  private right(lps: LayoutParamStyle) {
    if (lps.isVertical) {
      this.vertical(lps);
    } else {
      lps.outerStyle.justifyContent = "flex-end";
      if (lps.value !== null) {
        this.style.marginRight = lps.value.right + "px";
        this.style.width = lps.value.width + "px";
        this.style.minWidth = lps.value.width + "px";
      }
    }
  }

  private scale(lps: LayoutParamStyle) {
    if (lps.isVertical) {
      lps.outerClass += " centerer";

      if (lps.value !== null) {
        const parentHeight =
          Number.parseFloat(lps.value.top) +
          Number.parseFloat(lps.value.height) +
          Number.parseFloat(lps.value.bottom);
        this.style.height = `${
          (Number.parseFloat(lps.value.height) * 100) / parentHeight
        }%`;
        this.style.top = `${
          (Number.parseFloat(lps.value.top) * 100) / parentHeight
        }%`;
      }
    } else {
      if (lps.value !== null) {
        const parentWidth =
          Number.parseFloat(lps.value.left) +
          Number.parseFloat(lps.value.width) +
          Number.parseFloat(lps.value.right);
        this.style.width = `${
          (Number.parseFloat(lps.value.width) * 100) / parentWidth
        }%`;
        this.style.marginLeft = `${
          (Number.parseFloat(lps.value.left) * 100) / parentWidth
        }%`;
      }
    }
  }

  private center(lps: LayoutParamStyle) {
    if (lps.isVertical) {
      lps.outerClass += " centerer";
      lps.outerStyle.alignItems = "center";

      if (lps.value !== null) {
        this.style.marginTop = `${
          Number.parseFloat(lps.value.top) - Number.parseFloat(lps.value.bottom)
        }`;
        this.style.marginTop += "px";
      }
    } else {
      lps.outerStyle.justifyContent = "center";

      if (lps.value !== null) {
        this.style.width = lps.value.width + "px";
        this.style.marginLeft =
          lps.value.left && lps.value.right
            ? `${
                Number.parseFloat(lps.value.left) -
                Number.parseFloat(lps.value.right)
              }`
            : null;
        this.style.marginLeft += "px";
      }
    }
  }

  private bottom(lps: LayoutParamStyle) {
    if (lps.isVertical) {
      this.vertical(lps);
    } else {
      this.horizontal(lps);
    }
  }

  private bottomTop(lps: LayoutParamStyle) {
    if (lps.isVertical) {
      if (lps.value !== null && lps.value) {
        this.style.height = lps.value.height + "px";
      }
      lps.outerClass += " centerer";

      if (lps.value !== null) {
        this.style.marginTop = lps.value.top + "px";
        this.style.marginBottom = lps.value.bottom + "px";
      }
    } else {
      this.horizontal(lps);
    }
  }

  private top(lps: LayoutParamStyle) {
    if (lps.isVertical) {
      this.vertical(lps);
    } else {
      this.horizontal(lps);
    }
  }

  private vertical(lps: LayoutParamStyle) {
    if (lps.value !== null) {
      this.style.marginTop = lps.value.top + "px";
      this.style.marginBottom = lps.value.bottom + "px";
      this.style.minHeight = this.style.height;
      this.style.height = null;
    }
  }

  private horizontal(lps: LayoutParamStyle) {
    if (lps.value !== null) {
      this.style.marginLeft = lps.value.left + "px";
      this.style.width = lps.value.width + "px";
      this.style.minWidth = lps.value.width + "px";
    }
  }
}
