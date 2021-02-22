import { Resolver } from './resolver';
import {
  LayoutConstraint,
  SetLayoutConstraint,
  StyleLayout,
  ParamConstraint,
  Style
} from '../../core';

export class CodeGeneration {

  public layoutConstraints: Map<LayoutConstraint, 
                                SetLayoutConstraint<Partial<Style>>>;
  private resolver: Resolver;
  private styleLayout: StyleLayout<Partial<Style>>;

  constructor() {
    this.resolver = new Resolver();
    const s = new Style();
    this.styleLayout = new StyleLayout<Style>(s);
    this.layoutConstraints = this.resolver.layoutConstraints(this.styleLayout.style);
  }

  public generation() {
    const par: any = { };
    const resultFromApi = { 
      lc: LayoutConstraint.BOTTOM,
      param: par
    }
    const lc = this.layoutConstraints.get(resultFromApi.lc);
    this.styleLayout.constraint(lc, resultFromApi.param);
  }
}