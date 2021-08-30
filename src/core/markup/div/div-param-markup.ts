import { ParamMarkup } from '../param-markup';
import { CodeGeneration } from '../../../start/code-generation/code-generation';

export interface DivParamMarkup extends ParamMarkup {
  component: any;
  parent: any;
  style: any;
  outerStyle: any;
  innerClass: any;
  outerClass: any;
  nodeName: string | 'div';
  indent: any;
  maxChildren: [];
  minChildren: [];
  centerChildren: [];
  content: string[];
  codeGen: CodeGeneration;
  imgMap: [];
  componentMap: [];
}
