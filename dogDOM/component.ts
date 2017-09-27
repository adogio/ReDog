import parse from './parser';
import element from './element';
import S from './static';

class component {
    private rootElement: element;
    private _state: any;

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

    get state(): any {
        return this._state;
    }

    set state(newState: any) {
        this._state = newState;
    }

}

export { component as default };