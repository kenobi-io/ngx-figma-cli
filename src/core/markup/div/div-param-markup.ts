import { ParamMarkup } from '../param-markup';

export interface DivParamMarkup extends ParamMarkup {
    component: any;
    parent: any;
    styles: any;
    outerStyle: any;
    innerClass: any;
    outerClass: any;
    nodeName: string | 'div';
    indent: any;
    maxChildren: [];
    minChildren: [];
    centerChildren: [];
    content: [];
    createComponent: Function;
    visitNode: Function;
    imgMap: [];
    componentMap: [];
}