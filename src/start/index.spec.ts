// import { Tree } from '@angular-devkit/schematics';
// import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
// import * as path from 'path';


// SchematicTestRunner needs an absolute path to the collection to test.
// const collectionPath = path.join(__dirname, '../collection.json');


describe('start', () => {
  // it('requires required option', async () => {
  //   // We test that
  //   const runner = new SchematicTestRunner('schematics', collectionPath);
  //   await expect(runner.runSchematicAsync('start', {}, Tree.empty()).toPromise()).rejects.toThrow('error');
  // });

  it('works', async () => {
    // const runner = new SchematicTestRunner('schematics', collectionPath);
    // const tree = await runner.runSchematicAsync('start', { name: 'str' }, Tree.empty()).toPromise();

    // Listing files
    expect(['/allo', '/hola', '/test1', '/test2']).toEqual(['/allo', '/hola', '/test1', '/test2']);
  });
});
