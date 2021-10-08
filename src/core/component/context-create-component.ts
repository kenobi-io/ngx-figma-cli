import { strings } from '@angular-devkit/core';
import {
  Tree,
  SchematicsException,
  noop,
  applyTemplates,
  forEach,
  FileOperator,
  move,
  apply,
  url,
  Rule,
  mergeWith,
} from '@angular-devkit/schematics';
import {
  ModuleOptions,
  findModuleFromOptions,
} from '@schematics/angular/utility/find-module';
import { parseName } from '@schematics/angular/utility/parse-name';
import {
  validateName,
  validateHtmlSelector,
} from '@schematics/angular/utility/validation';
import {
  getWorkspace,
  buildDefaultPath,
} from '@schematics/angular/utility/workspace';
import { join } from 'path';
import { Schema } from '../../generate/schema';
import { buildSelector } from '../../utility';
import { SchemaFigma } from '../api';

export function contextCreateComponent(optionsSchema: Partial<Schema>): Rule {
  return async (tree: Tree) => {
    const path = join(__dirname, `./result.json`);
    console.log('dirname: ', path);
    const file = tree.read(
      './dist/out-tsc/tools/generators/ngx-figma-cli/generate/result.json'
    );
    const result: SchemaFigma = JSON.parse(file!.toString());

    console.log('result.name', result.name);

    const workspace = await getWorkspace(tree);
    const project = workspace.projects.get(optionsSchema.project as string);

    if (!project) {
      throw new SchematicsException(
        `Project "${optionsSchema.project}" does not exist.`
      );
    }

    if (optionsSchema.path === undefined) {
      optionsSchema.path = buildDefaultPath(project);
    }

    const moduleOptions = {
      ...optionsSchema,
    } as ModuleOptions;
    optionsSchema.module = findModuleFromOptions(tree, moduleOptions);

    const parsedPath = parseName(
      optionsSchema.path as string,
      optionsSchema.name
    );
    optionsSchema.name = parsedPath.name;
    optionsSchema.path = parsedPath.path;
    optionsSchema.selector =
      optionsSchema.selector ||
      buildSelector.bind(optionsSchema)((project && project.prefix) || '');
    validateName(optionsSchema.name);
    validateHtmlSelector(optionsSchema.selector);
    optionsSchema.type = 'Component';
    optionsSchema.skipSelector = false;
    optionsSchema.flat = false;
    optionsSchema.changeDetection = 'OnPush';
    optionsSchema.style = 'scss';
    const templateSource = apply(url('./files'), [
      noop(), // skipTests
      noop(), // skipStyleFile
      noop(), // inlineTemplate
      applyTemplates({
        ...strings,
        ...optionsSchema,
        'if-flat': (s: string) => (optionsSchema.flat ? '' : s),
        // tf: testFunc.bind({ id: '123', name: '64562' }),
      }),
      !optionsSchema.type
        ? forEach(((file) => {
            return file.path.includes('..')
              ? {
                  content: file.content,
                  path: file.path.replace('..', '.'),
                }
              : file;
          }) as FileOperator)
        : noop(),
      move(parsedPath.path),
    ]);
    return mergeWith(templateSource);
  };
}
