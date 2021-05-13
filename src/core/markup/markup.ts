export class Markup {
    document: string;
    print(msg: string, indent: string) {
        this.document += `${indent}${msg}\n`;
    }
}