import vdom from '../dogDOM/dogDOM';

export default class {
    private rootElement: HTMLElement;
    private rootDOM: vdom;

    constructor(DOMElement: HTMLElement, DOM: string) {
        this.rootElement = DOMElement;
        this.rootDOM = new vdom(DOM, this);
    }

    stringify(): string {
        return this.rootDOM.renderString();
    }

    mount(): void {
        this.rootElement.innerHTML = "";
        this.rootElement.appendChild(this.rootDOM.render());
    }

    reRender(): void {
        this.rootElement.innerHTML = "";
        this.rootElement.appendChild(this.rootDOM.render());
    }
}