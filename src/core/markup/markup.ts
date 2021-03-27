export class Markup extends HTMLBaseElement {
    document: string;
    print(msg: string, indent: string) {
        this.document += `${indent}${msg}\n`;
    }
}