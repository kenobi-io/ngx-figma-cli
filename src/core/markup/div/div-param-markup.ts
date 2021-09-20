import { ParamMarkup } from '../param-markup';
// import { CodeGeneration } from '../../../start/code-generation/code-generation';
import { Style } from '../../style/style';

export interface DivParamMarkup extends ParamMarkup {
  component: any;
  parent: any;
  outerStyle: any;
  innerClass: any;
  outerClass: any;
  nodeName: string | 'div';
  indent: any;
  maxChildren: any[];
  minChildren: any[];
  centerChildren: any[];
  content: string[];
  codeGen: // | CodeGeneration
  // |
  { createComponent: Function; visitNode: Function; print: Function };
  imgMap: [];
  componentMap: [];
  style: Style;
}
