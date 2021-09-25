import { ParamMarkup } from '../param-markup';
// import { FontSetStyle } from '../../style';

export interface ParagraphParamMarkup extends ParamMarkup {
  // fontSetStyle: FontSetStyle;
  para: any;
  styleCache: any;
  currStyle: any;
  ps: string[];
  content: string[];
}
