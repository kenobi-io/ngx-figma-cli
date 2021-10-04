import { ComponentMap } from '../component-map';

export class Markup {
  doc: string;
  component: any;
  imgMap: [];
  componentMap: ComponentMap;
  append: (msg: string, indent: string) => void;
}
