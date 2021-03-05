import {strings } from '@angular-devkit/core';
import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  chain,
  mergeWith,
  // template,
  url,
  // move,
  applyTemplates,
} from '@angular-devkit/schematics';
// import { take } from "rxjs/operators";
import { config } from 'dotenv';
// import {
//   FilesRequest,
//   // FileNodeFigma,
//   RestApiService
// } from '../core';

export default function (options: any): Rule {
  const rule = chain([
    (_tree: Tree, context: SchematicContext) => {
      config();
      context.logger.info('My Start Schematic: ' + JSON.stringify(options));
      // new RestApiService().get(FilesRequest, context)
      //   .pipe(take(1))
      //   .subscribe((result: any) => {
      //     if (result.document && result.components) {
      //       Object.keys(result).forEach((key) => context.logger.info('key: ' + key));
      //       // context.logger.info('NAME: ' + result?.name);
      //       // context.logger.info('lastModified: ' + result?.lastModified);
      //       // context.logger.info('components: ' + result?.components.size);
      //       // context.logger.info('document: ' + result?.document.children.length);
      //       // context.logger.info('nodes: ' + JSON.stringify(result?.nodes));
      //       // context.logger.info('schemaVersion: ' + result?.schemaVersion);
      //       // context.logger.info('styles: ' + result?.styles.size);
      //       // context.logger.info('version: ' + result?.version);
      //       // context.logger.info('thumbnailUrl: ' + result?.thumbnailUrl);
      //       // context.logger.info('role: ' + result?.role);
      //       // context.logger.info('err: ' + result?.err);
      //     } else {
      //       context.logger.info('UNKNOW ERROR');
      //     }

      //   });
    },
    mergeWith(apply(url('./files/components'), [
      applyTemplates({
        dasherize: strings.dasherize,
        INDEX: options.index
      }),
    ])),
  ]);
  
  return rule;
}
