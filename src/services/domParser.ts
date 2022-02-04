export default class DParser {
  parser: DOMParser;

  constructor() {
    this.parser = new DOMParser();
  }

  htmlToText(html: string) {
    return this.parser.parseFromString(html, "text/html").body.textContent;
  }
}
