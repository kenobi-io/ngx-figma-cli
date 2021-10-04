import { SchematicsException, Tree } from '@angular-devkit/schematics';
import * as ts from 'typescript';

export function readIntoSourceFile<T extends Partial<Tree>>(
  this: T,
  modulePath: string
): ts.SourceFile {
  const text = this.read(modulePath);
  if (text === null) {
    throw new SchematicsException(`File ${modulePath} does not exist.`);
  }
  const sourceText = text.toString('utf-8');

  return ts.createSourceFile(
    modulePath,
    sourceText,
    ts.ScriptTarget.Latest,
    true
  );
}
