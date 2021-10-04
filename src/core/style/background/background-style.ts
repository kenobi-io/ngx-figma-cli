import { Nodes, TypePaints, FrameFigma, RectangleFigma } from '../../api';
import { Style } from '../style';
import { BackgroundParamStyle } from './param-bg-style';
import { BackgroundSetStyle } from './bg-set-style';
import { InnerArrow } from '../../inner-arrow';

export class BackgroundStyle implements BackgroundSetStyle {
  public style: Partial<Style>;
  private backgroundMap: Map<TypePaints | Nodes | string, InnerArrow>;

  constructor(
    style: Partial<Style>,
    bgsMap?: Map<TypePaints | Nodes, InnerArrow>
  ) {
    this.style = style;
    this.backgroundMap = bgsMap ? bgsMap : this.background();
  }

  public invoke(
    bgEnum: TypePaints | Nodes | string,
    param: BackgroundParamStyle
  ): void {
    this.backgroundMap.get(bgEnum).call(this, param);
  }

  private background(): Map<TypePaints | Nodes | string, InnerArrow> {
    return new Map<TypePaints | Nodes, InnerArrow>()
      .set(TypePaints.IMAGE, (param: BackgroundParamStyle) => this.image(param))
      .set(TypePaints.SOLID, (param: BackgroundParamStyle) => this.solid(param))
      .set(TypePaints.GRADIENT_LINEAR, (param: BackgroundParamStyle) =>
        this.linearGradient(param)
      )
      .set(TypePaints.GRADIENT_RADIAL, (param: BackgroundParamStyle) =>
        this.radialGradient(param)
      )
      .set(Nodes.FRAME, (param: BackgroundParamStyle) => this.fraComInst(param))
      .set(Nodes.COMPONENT, (param: BackgroundParamStyle) =>
        this.fraComInst(param)
      )
      .set(Nodes.INSTANCE, (param: BackgroundParamStyle) =>
        this.fraComInst(param)
      )
      .set(Nodes.TEXT, (param: BackgroundParamStyle) => this.text(param));
  }

  private image(bgP: BackgroundParamStyle): void {
    const lastFill = this.style.lastPaint(bgP.value.fills);
    if (lastFill) {
      this.style.backgroundImage = this.style.imageUrl(lastFill.imageRef);
      if (lastFill.scaleMode === 'FILL') {
        this.style.backgroundSize = 'cover';
      } else {
        this.style.backgroundSize = undefined;
      }
    }
  }

  private solid(bgP: BackgroundParamStyle): void {
    const lastFill = this.style.lastPaint(bgP.value.fills);
    if (lastFill) {
      this.style.backgroundColor = this.style.colorToString(lastFill.color);
      lastFill.opacity && (this.style.opacity = `${lastFill.opacity}`);
    }
  }

  private linearGradient(bgP: BackgroundParamStyle): void {
    const lastFill = this.style.lastPaint(bgP.value.fills);
    if (lastFill) {
      this.style.background = this.style.paintToLinearGradient(lastFill);
    }
  }

  private radialGradient(bgP: BackgroundParamStyle): void {
    const lastFill = this.style.lastPaint(bgP.value.fills);
    if (lastFill) {
      this.style.background = this.style.paintToRadialGradient(lastFill);
    }
  }

  private fraComInst(bgP: BackgroundParamStyle | any): void {
    this.style.backgroundColor = this.style.colorToString(
      (bgP.value as FrameFigma).backgroundColor
    );
    if ((bgP.value as FrameFigma).clipsContent) {
      this.style.overflow = 'hidden';
    }
  }

  private text(bgP: BackgroundParamStyle): void {
    const lastFill = this.style.lastPaint(bgP.value.fills);
    if (lastFill) {
      this.style.color = this.style.colorToString(lastFill.color);
    }
  }
}
