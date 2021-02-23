import { Resolver } from './resolver';
import {
  LayoutConstraint,
  LayoutStyle,
  Style,
  BackgroundStyle,
  TypePaintEnum,
  RectangleFigma,
  EffectPropertyFigma,
  EffectStyle,
  FontStyle,
  ParamEffect,
  ParamFont
} from '../../core';

export class CodeGeneration {

  private resolver: Resolver;
  private layoutStyle: LayoutStyle<Partial<CSSStyleDeclaration>>;
  private backgroundStyle: BackgroundStyle<Partial<CSSStyleDeclaration>>;
  private effectStyle: EffectStyle<Partial<CSSStyleDeclaration>>;
  private fontStyle: FontStyle<Partial<CSSStyleDeclaration>>;

  constructor() {
    const style = new Style();
    this.resolver = new Resolver(style);
    this.layoutStyle = new LayoutStyle<Style>(style);
    this.backgroundStyle = new BackgroundStyle<Style>(style);
    this.effectStyle = new EffectStyle<Style>(style);
    this.fontStyle = new FontStyle<Style>(style);
  }

  public generation() {

    const mockResult = {
      lcKey: LayoutConstraint.BOTTOM,
      lcParam: {} as any,
      bgKey: TypePaintEnum.SOLID,
      node: {} as RectangleFigma,
      bgParam: {} as any,
      effects: [] as EffectPropertyFigma[],
      effectParam: {} as ParamEffect,
      fontKey: 'apply',
      fontParam: { } as ParamFont
    }

    // layout
    const setLC = this.resolver.lcsMap.get(mockResult.lcKey);
    this.layoutStyle.constraint(setLC, mockResult.lcParam);

    // backgound
    let lastFill;
    if (mockResult.node.fills && mockResult.node.fills.length > 0) {
      lastFill = mockResult.node.fills[mockResult.node.fills.length - 1];
    } else {
      lastFill = null;
    }
    if (lastFill) {
      const setBackground = this.resolver.backgroundMap.get(lastFill.type);
      this.backgroundStyle.set(setBackground, mockResult.bgParam);
    }

    // effect
    for (let i = 0; i < mockResult.effects.length; i++) {
      const effect = mockResult.effects[i];
      const setEffect = this.resolver.effectMap.get(effect.type);
      this.effectStyle.set(setEffect, mockResult.effectParam);
    }

    // font
    const setFont = this.resolver.fontMap.get(mockResult.fontKey);
    this.fontStyle.set(setFont, mockResult.)
  }
}