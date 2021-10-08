import { ItemNode } from '../../api';
export interface ParagraphMarkup {
  node: Partial<ItemNode>;
  para: string;
  styleCache: any;
  currStyle: number;
  ps: string[];
  content: string[];
}
