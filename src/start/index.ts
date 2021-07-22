import {
  Rule,
  SchematicContext,
  Tree,
  // apply,
  chain,
  // mergeWith,
  // template,
  // url,
  // move,
  // applyTemplates,
} from '@angular-devkit/schematics';
import { take } from 'rxjs/operators';
import { config } from 'dotenv';
import { CodeGeneration } from './code-generation/code-generation';
import { FilesRequest, RestApiService } from '../core';
import { Schema } from './schema';

export default function (options?: Schema): Rule {
  const rule = chain([
    (_tree: Tree, context: SchematicContext) => {
      config();
      options.index++;
      // context.logger.info('My Start Schematic: ' + JSON.stringify(options));
      new RestApiService()
        .get(FilesRequest, context)
        .pipe(take(1))
        .subscribe((result: any) => {
          const cg = new CodeGeneration();
          cg.generate(result, cg);
        });
    },
    // mergeWith(apply(url('./files/components'), [
    //   applyTemplates({
    //     dasherize: strings.dasherize,
    //     INDEX: options.index
    //   }),
    // ])),
  ]);

  return rule;
}

// // import {strings } from '@angular-devkit/core';
// import {
//   Rule,
//   SchematicContext,
//   Tree,
//   // apply,
//   chain,
//   // mergeWith,
//   // template,
//   // url,
//   // move,
//   // applyTemplates,
// }

// from "@angular-devkit/schematics";
// import { take } from "rxjs/operators";
// import { config } from "dotenv";
// import { CodeGeneration } from "./code-generation/code-generation";
// import { FilesRequest, RestApiService } from "../core";
// import { Schema } from "./schema";
// const fs = require("fs");

// export default function (options: Schema): Rule {
//   const rule = chain([
//     (_tree: Tree, context: SchematicContext) => {
//       config();
//       context.logger.info("My Start Schematic: " + JSON.stringify(options));
//       // new RestApiService()
//       //   .get(FilesRequest, context)
//       //   .pipe(take(1))
//       //   .subscribe((result: any) => {
//       //     // context.logger.info("result: " + JSON.stringify(result));
//       //     result = undefined;
//       //     console.log("result: ", result);
//       fs.readFile(
//         "/home/kenobi/repositories/figma-to-angular/src/components/result.json",
//         (err, data) => {
//           if (err) throw err;
//           let student = JSON.parse(data);
//           const cg = new CodeGeneration();
//           cg.generate(student, cg);
//         }
//       );
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
