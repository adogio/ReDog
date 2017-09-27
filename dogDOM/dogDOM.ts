import S from './static';
import element from './element';
import parse from './parser';

class dogDOM {
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

    render(): Node {
        return this.rootElement.render();
    }
}
export { dogDOM as default }