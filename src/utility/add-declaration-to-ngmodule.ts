import { strings } from '@angular-devkit/core';
import { Tree } from '@angular-devkit/schematics';
import {
  addDeclarationToModule,
  addExportToModule,
} from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';
import { buildRelativePath } from '@schematics/angular/utility/find-module';
import * as ts from 'typescript';
import { ComponentOption } from './component-option';

export function addDeclarationToNgModule<
  T extends Partial<Tree>,
  K extends Partial<ComponentOption>
>(
  this: T,
  componentOption: K,
  readIntoSourceFile: (this: T, modulePath: string) => ts.SourceFile
): void {
  componentOption.type =
    componentOption.type != null ? componentOption.type : 'Component';

  const modulePath = componentOption.module;
  const source = readIntoSourceFile.bind(this)(modulePath);

  const componentPath =
    `/${componentOption.path}/` +
    (componentOption.flat
      ? ''
      : strings.dasherize(componentOption.name) + '/') +
    strings.dasherize(componentOption.name) +
    (componentOption.type ? '.' : '') +
    strings.dasherize(componentOption.type);
  const relativePath = buildRelativePath(modulePath, componentPath);
  const classifiedName =
    strings.classify(componentOption.name) +
    strings.classify(componentOption.type);

  const declarationChanges = addDeclarationToModule(
    source,
    modulePath,
    classifiedName,
    relativePath
  );

  const declarationRecorder = this.beginUpdate(modulePath);
  for (const change of declarationChanges) {
    if (change instanceof InsertChange) {
      declarationRecorder.insertLeft(change.pos, change.toAdd);
    }
  }
  this.commitUpdate(declarationRecorder);

  if (componentOption.export) {
    const source = readIntoSourceFile.bind(this)(modulePath);

    const exportRecorder = this.beginUpdate(modulePath);
    const exportChanges = addExportToModule(
      source,
      modulePath,
      strings.classify(componentOption.name) +
        strings.classify(componentOption.type),
      relativePath
    );

    for (const change of exportChanges) {
      if (change instanceof InsertChange) {
        exportRecorder.insertLeft(change.pos, change.toAdd);
      }
    }
    this.commitUpdate(exportRecorder);
  }
}
