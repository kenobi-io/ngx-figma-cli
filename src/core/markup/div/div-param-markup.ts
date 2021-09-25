import { ParamMarkup } from '../param-markup';

export interface ComponentParamMarkup extends ParamMarkup {
  component: any;
  codeGen: // | CodeGeneration
  // |
  { createComponent: Function; visitNode: Function; print: Function };
  imgMap: [];
  componentMap: [];
}

export interface NodeParamMarkup {
  node;
  parent;
  content: string[];
  style;
  outerStyle;
  outerClass: string;
  innerClass: string;
  minChildren: any[];
  centerChildren: any[];
  maxChildren: any[];
  nodeName: string;
  indent: string;
}
