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
import { Schema } from '../../generate/schema';
import { buildSelector } from '../../utility';

export function contextCreateComponent(optionsSchema: Partial<Schema>): Rule {
  return async (tree: Tree) => {
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
    optionsSchema.changeDetection = 'OnPush';
    optionsSchema.style = 'scss';
    const templateSource = apply(url('./files/components'), [
      noop(),
      noop(),
      noop(),
      applyTemplates({
        ...strings,
        ...optionsSchema,
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
