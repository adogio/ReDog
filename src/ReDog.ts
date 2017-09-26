import vdom from '../dogDOM/dogDOM';

export default class {
    private rootElement: HTMLElement;
    private rootDOM: vdom;

    constructor(DOMElement) {
        this.rootElement = DOMElement;
    }

    stringify(): string {
        return this.rootDOM.renderString();
    }

    mount(): void {
        this.rootElement.appendChild(this.rootDOM.render());
    }
}