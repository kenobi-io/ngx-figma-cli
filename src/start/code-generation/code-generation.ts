// import { visitNode } from 'typescript';
// import {
//   LayoutConstraint,
//   LayoutStyle,
//   Style,
//   BackgroundStyle,
//   TypePaintEnum,
//   RectangleFigma,
//   EffectPropertyFigma,
//   EffectStyle,
//   EffectParamStyle,
//   ParamFont,
//   EffectSetStyle,
//   LayoutParamStyle,
//   DocumentFigma,
//   StrokeStyle,
//   BackgroundSetStyle,
//   LayoutSetStyle,
//   StrokeSetStyle,
//   FontSetStyle,
//   FontStyle
// } from '../../core';

// export class CodeGeneration {

//   // private resolver: Resolver;
//   private layoutStyle: LayoutSetStyle;
//   private bgStyle: BackgroundSetStyle;
//   private effectStyle: EffectSetStyle;
//   private strokeStyle: StrokeSetStyle;
//   private fontStyle: FontSetStyle;

//   constructor() {
//     const style = new Style();
//     // this.resolver = new Resolver(style);
//     this.layoutStyle = new LayoutStyle(style);
//     this.bgStyle = new BackgroundStyle(style);
//     this.effectStyle = new EffectStyle(style);
//     this.strokeStyle = new StrokeStyle(style);
//     this.fontStyle = new FontStyle(style);
//   }

//   public generation() {

//     const mockResult = {
//       lcKey: LayoutConstraint.BOTTOM,
//       lcParam: {} as LayoutParamStyle,
//       bgKey: TypePaintEnum.SOLID,
//       node: {} as RectangleFigma,
//       bgParam: {} as any,
//       effects: [] as EffectPropertyFigma[],
//       effectParam: {} as EffectParamStyle,
//       fontKey: 'apply',
//       fontParam: {} as ParamFont,
//       doc: {} as DocumentFigma
//     }

//     // // backgound
//     // let lastFill;
//     // } else {
//     //   lastFill = null;
//     // }
//     // // font
//     // const setFont = this.resolver.fontMap.get(mockResult.fontKey);
//     // this.fontStyle.set(setFont, mockResult.fontParam);


//     const canvas = mockResult.doc.children[0];
//     for (let i = 0; i < canvas.children.length; i++) {
//       const child = canvas.children[i]
//       if (child.name.charAt(0) === '#' && child.visible !== false) {
//         const child = canvas.children[i];
//         // fromFigma.createComponent(child, images, componentMap);
//         this.setLayout(child, mockResult.bgParam);
//         this.bgStyle.set(child.type, { value: child });
//         this.setEffect(child.effects, this.effectStyle);
//         this.strokeStyle.set(child.type, { value: child });
//         this.fontStyle.set(child.type, { value: child.style });
//       }
//     }
//   }

//   private setLayout(child: any, lcParam: LayoutParamStyle) {

//     if (child.order) {
//       lcParam.outerStyle.zIndex = child.order;
//     }
//     const cHorizontal = child.constraints && child.constraints.horizontal;
//     const cVertical = child.constraints && child.constraints.vertical;
//     lcParam.isVerical = false;
//     this.layoutStyle.set(cHorizontal, lcParam)
//     lcParam.isVerical = true;
//     this.layoutStyle.set(cVertical, lcParam);
//   }

//   private setEffect(effects: EffectPropertyFigma[], effectSetStyle: EffectSetStyle) {
//     for (let effect of effects) {
//       effectSetStyle.set(effect.type, { value: effect });
//     }
//   }

//   printDiv(styles, outerStyle, indent, nodeName = 'div') {
//     print(`<div [ngStyle]="${JSON.stringify(outerStyle).replace(/"/g, "'")}" class="${outerClass.replace(/"/g, "'")}">`, indent);
//     if (nodeName !== 'div') {
//       print(`  <${nodeName} [props]="props"`, indent);
//     } else {
//       print(`  <div`, indent);
//     }
//     print(`    id="${node.id}"`, indent);
//     print(`    [ngStyle]="${JSON.stringify(styles).replace(/"/g, "'")}"`, indent);
//     print(`    class="${innerClass}"`, indent);
//     print(`  >`, indent);
//     if (nodeName !== 'div') {
//       print(`</${nodeName}>`, '')
//       print(`</div>`, '')
//     }
//   }

//   applyFontStyle(_styles, fontStyle) {
//     if (fontStyle) {
//       _styles.fontSize = fontStyle.fontSize + 'px';
//       _styles.fontWeight = fontStyle.fontWeight;
//       _styles.fontFamily = fontStyle.fontFamily;
//       _styles.textAlign = fontStyle.textAlignHorizontal;
//       _styles.fontStyle = fontStyle.italic ? 'italic' : 'normal';
//       _styles.lineHeight = `${fontStyle.lineHeightPercent * 1.25}%`;
//       _styles.letterSpacing = `${fontStyle.letterSpacing}px`;
//     }
//   }

//   visitNode(node, parent, lastVertical, indent) {


//     let content = null;
//     let img = null;
//     const styles = {};
//     let minChildren = [];
//     const maxChildren = [];
//     const centerChildren = [];
//     let bounds = null;
//     let nodeBounds = null;

//     if (parent != null) {
//       nodeBounds = node.absoluteBoundingBox;
//       const nx2 = nodeBounds.x + nodeBounds.width;
//       const ny2 = nodeBounds.y + nodeBounds.height;
//       const parentBounds = parent.absoluteBoundingBox;
//       const px = parentBounds.x;
//       const py = parentBounds.y;

//       bounds = {
//         left: nodeBounds.x - px,
//         right: px + parentBounds.width - nx2,
//         top: lastVertical == null ? nodeBounds.y - py : nodeBounds.y - lastVertical,
//         bottom: py + parentBounds.height - ny2,
//         width: nodeBounds.width,
//         height: nodeBounds.height,
//       }
//     }

//     expandChildren(node, parent, minChildren, maxChildren, centerChildren, 0);

//     //layout

//     let outerClass = 'outerDiv';
//     let innerClass = 'innerDiv';
//     const outerStyle = {};
//     // // sublayout

//     // // sublayout
//     // background
//     // if (['FRAME', 'RECTANGLE', 'INSTANCE', 'COMPONENT'].indexOf(node.type) >= 0) {
//     //   // subbackground
//     // // effect
//     // // stroke
//     // }
//     // else 
//     if (node.type === 'TEXT') {

//       // // background
//       // // stroke
//       // //font

//       if (node.name.substring(0, 6) === 'input:') {

//         // named __name@dasherize__.component.ts.template
//         content = [
//           `<input key="${node.id}"` +
//           `type="text" placeholder="${node.characters}"` +
//           ` name="${node.name.substring(7)}" />`];

//       } else 
//       if (node.characterStyleOverrides) {

//         let para = '';
//         const ps = [];
//         const styleCache = {};
//         let currStyle = 0;

//         const commitParagraph = (key) => {
//           if (para !== '') {
//             if (styleCache[currStyle] == null && currStyle !== 0) {
//               styleCache[currStyle] = {};
//               applyFontStyle(styleCache[currStyle], node.styleOverrideTable[currStyle]);
//             }

//             const styleOverride = styleCache[currStyle] ? JSON.stringify(styleCache[currStyle]) : '{}';
//             let varname;
//             if (node.name.charAt(0) === '$') {
//               varName = node.name.substring(1);
//             }
//             if (varName) {
//               para = `
//                 <ng-container *ngIf="props?.${varName}">{{props.${varName}}}</ng-container>
//                 <ng-container *ngIf="!props?.${varName}">${para}</ng-container>
//                 `;
//             }
//             ps.push(`<span [ngStyle]="${styleOverride.replace(/"/g, "'")}" key="${key}">${para}</span>`);
//             para = '';
//           }
//         }

//         for (const i in node.characters) {
//           let idx = node.characterStyleOverrides[i];

//           if (node.characters[i] === '\n') {
//             commitParagraph(i);
//             ps.push(`<br key="${`br${i}`}" />`);
//             continue;
//           }

//           if (idx == null) idx = 0;
//           if (idx !== currStyle) {
//             commitParagraph(i);
//             currStyle = idx;
//           }

//           para += node.characters[i];
//         }
//         commitParagraph('end');

//         content = ps;
//       } else {
//         content = node.characters.split("\n").map((line, idx) => `<div key="${idx}">${line}</div>`);
//       }
//     }


//     if (parent != null) {
//       printDiv(styles, outerStyle, indent);
//     }

//     if (node.id !== component.id && node.name.charAt(0) === '#') {
//       const nodeName = node.name.replace(/\W+/g, '');
//       // TODO: parse props
//       printDiv(styles, outerStyle, indent, `app-C${nodeName}`);
//       createComponent(node, imgMap, componentMap);
//     } else if (node.type === 'VECTOR') {
//       // print html
//       print(`<div class="vector">${imgMap[node.id]}</div>`, indent);
//     } else {
//       const newNodeBounds = node.absoluteBoundingBox;
//       const newLastVertical = newNodeBounds && newNodeBounds.y + newNodeBounds.height;
//       print(`    <div>`, indent);
//       let first = true;
//       for (const child of minChildren) {
//         visitNode(child, node, first ? null : newLastVertical, indent + '      ');
//         first = false;
//       }
//       for (const child of centerChildren) visitNode(child, node, null, indent + '      ');
//       if (maxChildren.length > 0) {
//         outerClass += ' maxer';
//         styles.width = '100%';
//         styles.pointerEvents = 'none';
//         styles.backgroundColor = null;
//         printDiv(styles, outerStyle, indent + '      ');
//         first = true;
//         for (const child of maxChildren) {
//           visitNode(child, node, first ? null : newLastVertical, indent + '          ');
//           first = false;
//         }
//         print(`        </div>`, indent);
//         print(`      </div>`, indent);
//       }
//       if (content != null) {
//         if (node.name.charAt(0) === '$') {
//           const varName = node.name.substring(1);
//           for (const piece of content) {
//             print(piece, indent + '        ');
//           }
//         } else {
//           for (const piece of content) {
//             print(piece, indent + '      ');
//           }
//         }
//       }
//       print(`    </div>`, indent);
//     }

//     if (parent != null) {
//       print(`  </div>`, indent);
//       print(`</div>`, indent);
//     }
//   }

//   createComponent(component, imgMap, componentMap) {

//     const name = 'C' + component.name.replace(/\W+/g, '');
//     const instance = name + component.id.replace(';', 'S').replace(':', 'D');

//     let doc = '';

//     const path = `src/components/${name}.component.ts`;

//     if (!fs.existsSync(path)) {
//       const componentSrc = `
//           import { Component, Input } from '@angular/core';
//           import { FrameFigma } from '../../core/api/figma/nodes/frame.figma';
//           import { LayoutParamStyle } from '../../core/style/layout/layout-param-style';

//           @Component({
//             selector: 'app-${name}',
//             templateUrl: '${name}.component.html',
//           })
//           export class ${name}Component  {
//             @Input() props: any;
//           }
//           `;
//       fs.writeFile(path, componentSrc, function (err) {
//         if (err) console.log(err);
//         console.log(`wrote ${path}`);
//       });
//     }

//     function print(msg, indent) {
//       doc += `${indent}${msg}\n`;
//     }

//     visitNode(component, null, null, '  ');

//     const htmPath = `src/components/${name}.component.html`;
//     fs.writeFile(htmPath, doc, function (err) {
//       if (err) console.log(err);
//       console.log(`wrote ${htmPath}`);
//     });
//     componentMap[component.id] = { instance, name, doc };
//   }
// }