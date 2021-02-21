// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  fileKey: process.env.FILE_KEY || 'AK8NkbH7rEJtoUSRgCjV3N',
  token: process.env.DEV_TOKEN || '160268-d475cd95-efa0-4894-90ae-ec159f5383b2',
  url: 'https://api.figma.com',
  versionFile: 'v1/files',
  versionImage: 'v1/images'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
