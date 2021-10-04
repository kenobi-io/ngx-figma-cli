// import { Schema } from '../start/schema';

import { strings } from '@angular-devkit/core';
import { Schema } from '../generate/schema';

export function buildSelector<T extends Partial<Schema>>(
  this: T,
  projectPrefix: string
) {
  let selector = strings.dasherize(this.name);
  if (this.prefix) {
    selector = `${this.prefix}-${selector}`;
  } else if (this.prefix === undefined && projectPrefix) {
    selector = `${projectPrefix}-${selector}`;
  }

  return selector;
}
