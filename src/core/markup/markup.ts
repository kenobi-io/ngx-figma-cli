export class Markup {
  // TODO: rethink this in favor of a larger DCI
  // it is posilble this implamentaintion is not cononical
  // separate behavior from sturcture
  document: string;
  print(msg: string, indent: string) {
    this.document += `${indent}${msg}\n`;
  }
}
