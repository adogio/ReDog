import S from './static';
import element from './element';
import component from './component';
import parse from './parser';
import props from './props';

class dogDOM {
    private rootComponent: component;

    constructor(dom: string) {
        this.rootComponent = new component(dom);
    }

    getDomElement(): HTMLElement {
        return this.rootComponent.getDomElement();
    }

    renderString(): string {
        return this.rootComponent.renderString();
    }

    render(): Node {
        return this.rootComponent.render();
    }
}
export { dogDOM as default }