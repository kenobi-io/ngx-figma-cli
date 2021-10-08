export interface ComponentMarkup {
  value: any;
  component: any;
  codeGen: { createComponent: Function; visitNode: Function; print: Function };
  imgMap: [];
  componentMap: [];
}
