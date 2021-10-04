import {
  Rule,
  SchematicContext,
  Tree,
  chain,
  externalSchematic,
  SchematicsException,
} from '@angular-devkit/schematics';
import { take, concatMap, catchError } from 'rxjs/operators';
import {
  ComponentMap,
  contextCreateComponent,
  createComponent,
  FilesRequest,
  ImagesRequest,
  RestApiService,
  SchemaFigma,
} from '../core';
import { Schema } from './schema';
import { pagePreprocessTree } from '../core/process-tree/page-process-tree';
import { errorHandler } from '../utility';
import { virtualFs, workspaces } from '@angular-devkit/core';
import { join } from 'path';
import { ModuleOptions } from '@schematics/angular/utility/find-module';

// import * as fetch from 'node-fetch';

// export default function (options?: Schema): Rule {
//   const rule = chain([
//     (_tree: Tree, context: SchematicContext) => {
//       // config();
//       // options.index++;
//       v
//       // // context.logger.info('My Start Schematic: ' + JSON.stringify(options));
//       // new RestApiService()
//       //   .get(FilesRequest, context)
//       //   .pipe(take(1))
//       //   .subscribe((result: any) => {
//       //     // const cg = new CodeGeneration();
//       //     // cg.generate(result, cg);
//       const path = `./src/result.json`;
//       const file = _tree.read(path);
//       const result = JSON.parse(file!.toString());
//       main(result).catch((err) => {
//         console.error(err);
//         console.error(err.stack);
//       });
//       // });
//     },
//     // mergeWith(apply(url('./files/components'), [
//     //   applyTemplates({
//     //     dasherize: strings.dasherize,
//     //     INDEX: options.index
//     //   }),
//     // ])),
//   ]);

//   return rule;
// }

function createHost(tree: Tree): workspaces.WorkspaceHost {
  return {
    async readFile(path: string): Promise<string> {
      const data = tree.read(path);
      console.log('readFile path: ', path);
      if (!data) {
        throw new SchematicsException('File not found.');
      }
      return virtualFs.fileBufferToString(data);
    },
    async writeFile(path: string, data: string): Promise<void> {
      console.log('writeFile path: ', path);
      return tree.overwrite(path, data);
    },
    async isDirectory(path: string): Promise<boolean> {
      console.log('isDirectory path: ', path);
      return !tree.exists(path) && tree.getDir(path).subfiles.length > 0;
    },
    async isFile(path: string): Promise<boolean> {
      console.log('isFile path: ', path);
      return tree.exists(path);
    },
  };
}

export default function (optionsSchema?: Partial<Schema>): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return chain([
      async (tree: Tree, context: SchematicContext) => {
        // config();
        context.logger.log('info', `${optionsSchema}`);
        let moduleOption: Partial<ModuleOptions> = optionsSchema;
        // // const workspaceConfig = tree.read('/angular.json');
        // // if (!workspaceConfig) {
        // //   throw new SchematicsException(
        // //     'Could not find Angular workspace configuration'
        // //   );
        // // }

        // // // convert workspace to string
        // // const workspaceContent = workspaceConfig.toString();

        // // // parse workspace string into JSON object
        // // const workspace: experimental.workspace.WorkspaceSchema =
        // //   JSON.parse(workspaceContent);
        // // if (!options.project) {
        // //   options.project = workspace.defaultProject;
        // // }

        // // const projectName = options.project as string;

        // // const project = workspace.projects[projectName];

        // // const projectType = project.projectType === 'application' ? 'app' : 'lib';

        // // if (options.path === undefined) {
        // //   options.path = `${project.sourceRoot}/${projectType}`;
        // // }
        // // // context.logger.info('My Start Schematic: ' + JSON.stringify(options));
        // // new RestApiService()
        // //   .get(FilesRequest, context)
        // //   .pipe(take(1))
        // //   .subscribe((result: any) => {
        // //     // const cg = new CodeGeneration();
        // //     // cg.generate(result, cg);
        // const host = createHost(tree);
        // const pathProject = 'src/generate/figma-test';
        // // join(
        // //   __dirname,
        // //   // '../../../../repositories/figma-test/',
        // //   // '.',
        // //   '../figma-test'
        // // );
        // console.log('pathProject: ', pathProject);
        // const format = workspaces.WorkspaceFormat.JSON;
        // const { workspace } = await workspaces.readWorkspace(
        //   pathProject,
        //   host,
        //   format
        // );

        // // if (!moduleOption.project) {
        // //   moduleOption.project = workspace.extensions.defaultProject;
        // // }

        // // console.log('workspace.extensions.defaultProject', options.project);

        // // const project = {
        // //   extensions: { projectType: 'application' },
        // //   sourceRoot: 'src',
        // // };
        // // const project = workspace.projects.get(moduleOption.project.toString());
        // // if (!project) {
        // //   throw new SchematicsException(
        // //     `Invalid project name: ${moduleOption.project}`
        // //   );
        // // }

        // const projectType =
        //   // project.extensions.projectType === 'application' ? 'app' : 'lib';
        //   'app';

        // if (moduleOption.path === undefined) {
        //   moduleOption.path = `${pathProject}/${projectType}`;
        // }
        const path = join(__dirname, `./result.json`);
        console.log('dirname: ', path);
        const file = tree.read(
          './dist/out-tsc/tools/generators/ngx-figma-cli/generate/result.json'
        );
        const result: SchemaFigma = JSON.parse(file!.toString());
        const vectors: string[] = [];
        const firstPage = pagePreprocessTree(result, vectors);

        let guids = vectors.join(',');
        let api = new RestApiService();
        api
          .get(ImagesRequest, guids)
          .pipe(
            concatMap(async (res) => {
              const imageJSON = res as any;
              const images = imageJSON.images || {};
              if (images) {
                let promises = [];
                let guids = [];
                for (const guid in images) {
                  if (images[guid] == null) {
                    continue;
                  }
                  guids.push(guid);
                  // promises.push(fetch(images[guid]));
                }

                let responses = await Promise.all(promises);
                promises = [];
                for (const resp of responses) {
                  promises.push(resp.text());
                }

                responses = await Promise.all(promises);
                for (let i = 0; i < responses.length; i++) {
                  images[guids[i]] = responses[i].replace(
                    '<svg ',
                    '<svg preserveAspectRatio="none" '
                  );
                }
              }
              return images;
            }),
            catchError((err) => errorHandler(err))
          )
          .subscribe((images: []) => {
            const componentMap: ComponentMap = {} as ComponentMap;

            for (let i = 0; i < firstPage.children.length; i++) {
              const child = firstPage.children[i];
              if (child.name.charAt(0) === '#' && child.visible !== false) {
                const child = firstPage.children[i];
                createComponent(child, images, componentMap);
              }
            }
            // options.project = project;
            console.log('path: ', moduleOption.path);
            // for (const key in componentMap) {
            //   const component = componentMap[key];
            // options.name = component.name;
            moduleOption.name = 'FClock';
            // console.log('name: ', options.name);
            // options.selector = component.instance;
            // const addedModule = externalSchematic(
            //   '@schematics/angular',
            //   'module',
            //   {
            //     name: options.name,
            //   }
            // );
            // modulesMap.push(addedModule);
            // const declare = addDeclarationToNgModule(options);
            // modulesMap.push(declare);
            // }
          });
        moduleOption.name = 'FClock';
        // options.project = project;
        moduleOption.module = 'app.module.ts';
        console.log('End 1 step');
        // options.selector = 'app-FClock';
      },
      contextCreateComponent(optionsSchema),
      () => console.log('3 step'),
      // externalSchematic(
      //   '@schematics/angular',
      //   'module',
      //   optionsSchema as ModuleOptions
      // ),
      () => console.log('4 step'),
    ])(tree, context);
  };
}
