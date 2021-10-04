import { JsonArray, JsonObject } from '@angular-devkit/core';

export interface Schema {
  name: string;
  project: string | number | boolean | JsonArray | JsonObject;
  target: string;
  configuration: string;
  prefix: string;
  type: string;
  module: string;
  path: string;
  export: boolean;
  selector: string;
  flat: boolean;
  skipSelector: boolean;
  changeDetection: 'OnPush' | 'Default';
  style: 'scss' | 'css';
}
