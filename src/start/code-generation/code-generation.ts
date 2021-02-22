import { Resolver } from './resolver';
import {
  LayoutConstraint,
  SetLayoutConstraint,
  StyleLayout,
  Style,
  StyleBackground,
  TypePaintEnum,
  SetBackground,
  RectangleFigma,
  EffectPropertyFigma
} from '../../core';

export class CodeGeneration {

  public lcsMap: Map<LayoutConstraint, 
                                   SetLayoutConstraint<Partial<CSSStyleDeclaration>>>;
  public backgroundMap: Map<TypePaintEnum, 
                            SetBackground<Partial<CSSStyleDeclaration>>>;
  private resolver: Resolver;
  private styleLayout: StyleLayout<Partial<CSSStyleDeclaration>>;
  private styleBackground: StyleBackground<Partial<CSSStyleDeclaration>>;

  constructor() {
    this.resolver = new Resolver();
    const s = new Style();
    this.styleLayout = new StyleLayout<Style>(s);
    this.styleBackground = new StyleBackground<Style>(s);
    this.lcsMap = this.resolver.layoutConstraints(this.styleLayout.style);
    this.backgroundMap = this.resolver.background(this.styleLayout.style);
  }

  public generation() {
    const par: any = { };
    const bgPar: any = { };
    const resultFromApi = { 
      lc: LayoutConstraint.BOTTOM,
      param: par,
      bg: TypePaintEnum.SOLID,
      node: { } as RectangleFigma,
      bgParam: bgPar
    }
    this.styleLayout.constraint(this.lcsMap.get(resultFromApi.lc), resultFromApi.param);
    let lastFill;
    if (resultFromApi.node.fills && resultFromApi.node.fills.length > 0) {
        lastFill = resultFromApi.node.fills[resultFromApi.node.fills.length - 1];
    } else {
        lastFill = null;
    }
    if (lastFill) {
        this.styleBackground.set(this.backgroundMap.get(lastFill.type), resultFromApi.bgParam);
    }
  }

    //   // role layout.cnstraint()
    //   public layoutConstraint(
    //     style: any,
    //     bound: any,
    //     horizontal: LayoutConstraintHorizontalEnum,
    //     vertical: LayoutConstraintVerticalEnum,
    //     outerStyle?: any,
    //     outerClass?: any): void {

    //     this.setStyle[horizontal](style, bound, outerStyle, outerClass);
    //     this.setStyle[vertical](style, bound, outerStyle, outerClass);
    // }


    // role effect.set()
    public setEffect(effects: EffectPropertyFigma[], style: any): void {
        for (let i = 0; i < effects.length; i++) {
            const effect = effects[i];
            this.setStyle[effect.type](effect, style);
        }
    }
}