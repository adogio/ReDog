import S from './static';
import element from './element';
import parse from './parser';

export default class {
    private rootElement: element;

    constructor(dom: string) {
        this.rootElement = parse(dom);
    }

    getDomElement(): HTMLElement {
        return this.rootElement.getNode();
    }

    renderString(): string {
        return this.rootElement.renderString();
    }

    render(): HTMLElement {
        return this.rootElement.render();
    }
}