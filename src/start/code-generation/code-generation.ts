import { map, catchError, mergeMap, concatMap } from "rxjs/operators";
import { of, forkJoin } from "rxjs";
import fetch from "node-fetch";
import * as fs from "fs";

import {
  LayoutStyle,
  Style,
  BackgroundStyle,
  EffectStyle,
  EffectSetStyle,
  StrokeStyle,
  BackgroundSetStyle,
  LayoutSetStyle,
  StrokeSetStyle,
  FontSetStyle,
  FontStyle,
  ParagraphSetMarkup,
  ParagraphMarkup,
  Markup,
  ParagraphParamMarkup,
  Nodes,
  DivSetMarkup,
  DivMarkup,
  DivParamMarkup,
  RestApiService,
  ImagesRequest,
  ImageRequest,
  Vectors,
  Groups,
  LayoutConstraints,
  LayoutParamStyle,
  RectangleFigma,
} from "../../core";

export class CodeGeneration {
  private layoutStyle: LayoutSetStyle;
  private backgroundStyle: BackgroundSetStyle;
  private effectStyle: EffectSetStyle;
  private strokeStyle: StrokeSetStyle;
  private fontStyle: FontSetStyle;
  private paragraphSetMarkup: ParagraphSetMarkup;
  private divSetMarkup: DivSetMarkup;
  private api: RestApiService;

  constructor() {
    const style = new Style();
    const markup = new Markup();
    this.layoutStyle = new LayoutStyle(style);
    this.backgroundStyle = new BackgroundStyle(style);
    this.effectStyle = new EffectStyle(style);
    this.strokeStyle = new StrokeStyle(style);
    this.fontStyle = new FontStyle(style);
    this.paragraphSetMarkup = new ParagraphMarkup(markup);
    this.divSetMarkup = new DivMarkup(markup);
    this.api = new RestApiService();
  }

  public generate(result: any, codeGen?: CodeGeneration): void {
    // result files request
    const vectorList: any[] = [];
    const vectorMap = {};
    let responses;
    let data = result;
    const doc = data.document;
    const canvas = doc.children[0];
    const div = {} as DivParamMarkup;
    div.codeGen = codeGen;
    for (let i = 0; i < canvas.children.length; i++) {
      const child = canvas.children[i];
      console.log(`name is ${child.name} and id: `, child.id);
      if (child.name.charAt(0) === "#" && child.visible !== false) {
        const child = canvas.children[i];
        this.preprocessTree(child, vectorList, vectorMap);
      }
    }

    let guids = vectorList.join(",");
    let promises: unknown[] = [];
    let images;

    this.api
      .get(ImagesRequest, guids)
      .pipe(
        concatMap(async (res) => {
          data = res;
          // const imageRes = []
          const imageJSON = data;
          images = imageJSON.images || {};
          if (images) {
            let guids = [];

            for (const guid in images) {
              if (images[guid] == null) {
                continue;
              }
              guids.push(guid);
              const re = await this.api
                .get(ImageRequest, images[guid])
                .toPromise();
              promises.push(re);
            }
          }
          responses = promises;
          promises = [];

          for (const resp of responses) {
            promises.push((resp as any).text());
          }

          responses = promises;

          for (let i = 0; i < responses.length; i++) {
            images[guids[i]] = responses[i]
              .toString()
              .replace("<svg ", '<svg preserveAspectRatio="none" ');
          }
          return of(images);
        }),
        catchError((err) => this.errHandler(err))
      )
      .subscribe((images: []) => {
        const componentMap: any = {};
        let contents = `import { NgModule } from '@angular/core';\n`;
        contents += `import { FormsModule } from '@angular/forms';\n`;
        contents += `import { CommonModule } from '@angular/common';\n`;
        let nextSection = ``;
        div.imgMap = images;
        for (let i = 0; i < canvas.children.length; i++) {
          const child = canvas.children[i];

          if (child.name.charAt(0) === "#" && child.visible !== false) {
            const child = canvas.children[i];
            console.log("canvas.children.length: ", canvas.children.length);
            this.createComponent(child, images, componentMap, div);
          }
        }
        const imported: any = {};
        const components = [];

        for (const key in componentMap) {
          const component = componentMap[key];
          const name = component.name;

          if (!imported[name]) {
            contents += `import { ${name}Component } from './${name}.component';\n`;
            components.push(name + "Component");
          }
          imported[name] = true;
        }
        contents += "\n";
        contents += nextSection;
        nextSection = "";
        nextSection += "@NgModule({\n";
        nextSection += "  imports: [ CommonModule, FormsModule ],\n";
        nextSection += `  declarations: [ ${components.join(", ")} ],\n`;
        nextSection += `  exports: [ ${components.join(", ")} ],\n`;
        nextSection += `})\n`;
        nextSection += `export class FigmaModule { }`;
        contents += nextSection;
        const path = "./src/components/figma.module.ts";

        // TODO: if file './src/components/figma.module.ts' does't exists.
        fs.writeFile(path, contents, (err: any) => {
          if (err) {
            console.log(err);
          }
          console.log(`wrote ${path}`);
        });
      });
  }

  private errHandler(err: any) {
    console.log(err);
    return err;
  }

  private preprocessTree(
    node: {
      name: string;
      fills: any;
      strokes: any;
      blendMode: string | null;
      type: any;
      children: any[];
      constraints: {
        vertical: any;
        horizontal: any;
      };
      id: string | number;
    },
    vectorList: any[],
    vectorMap: any
  ) {
    let vectorsOnly = node.name.charAt(0) !== "#";
    let vectorVConstraint = null;
    let vectorHConstraint = null;

    if (
      this.paintsRequireRender(node.fills) ||
      this.paintsRequireRender(node.strokes) ||
      (node.blendMode != null &&
        ["PASS_THROUGH", "NORMAL"].indexOf(node.blendMode) < 0)
    ) {
      node.type = "VECTOR";
    }
    const children =
      node.children && node.children.filter((child) => child.visible !== false);

    if (children) {
      for (let j = 0; j < children.length; j++) {
        if (Object.values(Vectors).includes(children[j].type)) {
          vectorsOnly = false;
        } else {
          if (
            vectorVConstraint != null &&
            children[j].constraints.vertical != vectorVConstraint
          ) {
            vectorsOnly = false;
          }
          if (
            vectorHConstraint != null &&
            children[j].constraints.horizontal != vectorHConstraint
          ) {
            vectorsOnly = false;
          }
          vectorVConstraint = children[j].constraints.vertical;
          vectorHConstraint = children[j].constraints.horizontal;
        }
      }
    }
    node.children = children;

    if (children && children.length > 0 && vectorsOnly) {
      node.type = "VECTOR";
      node.constraints = {
        vertical: vectorVConstraint,
        horizontal: vectorHConstraint,
      };
    }

    if (Object.values(Vectors).includes(node.type)) {
      node.type = "VECTOR";
      vectorMap[node.id] = node;
      vectorList.push(node.id);
      node.children = [];
    }

    if (node.children) {
      for (const child of node.children) {
        this.preprocessTree(child, vectorList, vectorMap);
      }
    }
  }

  private paintsRequireRender(paints: any): boolean {
    if (!paints) {
      return false;
    }
    let numPaints = 0;
    for (const paint of paints) {
      if (paint.visible === false) {
        continue;
      }
      numPaints++;
      if (paint.type === "EMOJI") {
        return true;
      }
    }

    return numPaints > 1;
  }

  public createComponent(
    component: any,
    imagesMap: any,
    componentMap: any,
    div?: DivParamMarkup
  ) {
    const name = "C" + component.name.replace(/\W+/g, "");
    const instance = name + component.id.replace(";", "S").replace(":", "D");
    const path = `src/components/${name}.component.ts`;

    if (!fs.existsSync(path)) {
      const componentSrc = `
      import { Component, Input } from '@angular/core';
      @Component({
        selector: 'app-${name}',
        templateUrl: '${name}.component.html',
      })
      export class ${name}Component  {
        @Input() props: any;
      }`;

      fs.writeFile(path, componentSrc, (err: any) => {
        if (err) {
          console.log(err);
        }
        console.log(`wrote ${path}`);
      });
    }
    div.component = component;
    div.imgMap = imagesMap;
    div.componentMap = componentMap;
    console.log("visitNode call");
    this.visitNode(component, null, null, "  ", div);

    const htmPath = `src/components/${name}.component.html`;
    fs.writeFile(htmPath, this.divSetMarkup.markup.document, (err: any) => {
      if (err) console.log(err);
      console.log(`wrote ${htmPath}`);
    });
    componentMap[component.id] = {
      instance,
      name,
      doc: this.divSetMarkup.markup.document,
    };
  }

  public visitNode(
    node: any,
    parent: Window | null | any,
    lastVertical: number | null,
    indent?: any,
    div?: DivParamMarkup
  ) {
    let content = null;
    node.style = {};
    let minChildren = [];
    const maxChildren = [];
    const centerChildren = [];
    let bounds: Partial<Style> = null;
    const layoutParam: LayoutParamStyle = {} as LayoutParamStyle;
    let nodeBounds = null;
    layoutParam.value = bounds as Style;

    if (parent != null) {
      nodeBounds = node.absoluteBoundingBox;
      const nx2 = nodeBounds.x + nodeBounds.width;
      const ny2 = nodeBounds.y + nodeBounds.height;
      const parentBounds = parent.absoluteBoundingBox;
      const px = parentBounds.x;
      const py = parentBounds.y;

      bounds = {
        left: `${nodeBounds.x - px}`,
        right: `${px + parentBounds?.width - nx2}`,
        top:
          lastVertical == null
            ? `${nodeBounds.y - py}`
            : `${nodeBounds.y - lastVertical}`,
        bottom: `${py + parentBounds?.height - ny2}`,
        width: nodeBounds.width,
        height: nodeBounds.height,
      };
    }
    this.expandChildren(
      node,
      parent,
      minChildren,
      maxChildren,
      centerChildren,
      0
    );
    const paragraphParamMarkup = {} as ParagraphParamMarkup;
    paragraphParamMarkup.content = content;
    paragraphParamMarkup.fontSetStyle = this.fontStyle;
    div.value = node;
    div.value.id = node.id;
    div.indent = indent;
    div.minChildren = minChildren as any;
    div.centerChildren = centerChildren as any;
    div.maxChildren = maxChildren as any;
    div.outerClass = "outerDiv";
    layoutParam.outerClass = "outerDiv";
    layoutParam.outerStyle = {} as Style;
    div.outerStyle = layoutParam.outerStyle;
    div.innerClass = "innerDiv";
    const cHorizontal = node.constraints && node.constraints.horizontal;
    const cVertical = node.constraints && node.constraints.vertical;

    console.log("node type: ", node.type);
    if (node.order) {
      layoutParam.outerStyle.zIndex = node.order;
    }
    // --- constraints
    layoutParam.isVertical = false;
    this.layoutStyle.invoke(cHorizontal, layoutParam); // +
    layoutParam.isVertical = true;
    this.layoutStyle.invoke(cVertical, layoutParam); // +
    node.style = this.layoutStyle.style;
    div.style = node.style;
    // console.log("node style", node.style);
    // ---
    // --- FRAME, RECTANGLE, INSTANCE, COMPONENT
    if (
      node.type === Nodes.FRAME ||
      node.type === Nodes.INSTANCE ||
      node.type === Nodes.COMPONENT
    ) {
      this.backgroundStyle.style.backgroundColor =
        this.backgroundStyle.style.colorToString(node.backgroundColor);
      node.style.backgroundColor = this.backgroundStyle.style.backgroundColor;
    } else if (node.type === Nodes.RECTANGLE) {
      // --- --- SOLID
      const lastFill = this.backgroundStyle.style.lastPaint(
        (node as RectangleFigma).fills
      );
      this.backgroundStyle.style = node.style;
      this.backgroundStyle.invoke(lastFill.type, { value: node }); // +

      this.fontStyle.style = node.style;
      for (let effect of node.effects) {
        this.effectStyle.invoke(effect.type, { value: effect }); // +
      }
      this.strokeStyle.style = node.style;
      this.strokeStyle.invoke(node.type, { value: node }); // +
    } else if (node.type === Nodes.TEXT) {
      // --- TEXT
      this.backgroundStyle.invoke(node.type, { value: node });
      this.fontStyle.style = node.style;
      this.fontStyle.invoke(node.type, { value: node.style });
      this.paragraphSetMarkup.invoke(node.type, paragraphParamMarkup);
    }
    this.divSetMarkup.invoke(node.type, div);
  }

  private expandChildren(
    node: any,
    parent: null,
    minChildren: any[],
    maxChildren: any[],
    centerChildren: any[],
    offset: number
  ) {
    const children = node.children;
    let added = offset;
    console.log("EX node.children: ", node.children);
    if (children) {
      for (let i = 0; i < children.length; i++) {
        const child = children[i];

        if (
          parent != null &&
          (node.type === Nodes.COMPONENT || node.type === Nodes.INSTANCE)
        ) {
          child.constraints = {
            vertical: LayoutConstraints.TOP_BOTTOM,
            horizontal: LayoutConstraints.LEFT_RIGHT,
          };
        }

        if (Object.values(Groups).includes(child.type)) {
          added += this.expandChildren(
            child,
            parent,
            minChildren,
            maxChildren,
            centerChildren,
            added + i
          );
          continue;
        }
        child.order = i + added;

        if (
          child.constraints &&
          child.constraints.vertical === LayoutConstraints.BOTTOM
        ) {
          maxChildren.push(child);
        } else if (
          child.constraints &&
          child.constraints.vertical === LayoutConstraints.TOP
        ) {
          minChildren.push(child);
        } else {
          centerChildren.push(child);
        }
      }
      minChildren.sort(this.nodeSort);
      maxChildren.sort(this.nodeSort);

      return added + children.length - offset;
    }

    return added - offset;
  }

  private nodeSort(a: any, b: any): number {
    if (a.absoluteBoundingBox.y < b.absoluteBoundingBox.y) {
      return -1;
    } else if (a.absoluteBoundingBox.y === b.absoluteBoundingBox.y) {
      return 0;
    } else {
      return 1;
    }
  }
}
