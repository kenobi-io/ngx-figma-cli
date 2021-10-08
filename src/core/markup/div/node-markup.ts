import { Style } from '../../style';
import { ItemNode } from '../../api';

export interface NodeMarkup {
  node: Partial<ItemNode>;
  parent: Partial<ItemNode>;
  content: string[];
  style: Partial<Style>;
  outerStyle: string;
  outerClass: string;
  innerClass: string;
  minChildren: any[];
  centerChildren: any[];
  maxChildren: any[];
  nodeName: string;
  indent: string;
}
