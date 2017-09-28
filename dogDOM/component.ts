import parse from './parser';
import element from './element';
import S from './static';
import ddom from './dogDOM';

declare const window: any;

class component {
    private rootElement: element;
    private parantVDOM: ddom;
    private binded: any;
    private _state: any;

    public constructor(dom: string, vdom: ddom) {
        this._state = { test: "test", ts: "tes" };
        this.parantVDOM = vdom;
        window.test = () => {
            this.state = { test: 100 };
        }
        this.binded = {};
        this.rootElement = parse(dom, this);
    }

    public getDomElement(): HTMLElement {
        return this.rootElement.getNode();
    }

    public renderString(): string {
        return this.rootElement.renderString();
    }

    public render(): Node {
        return this.rootElement.render();
    }

    public get state(): any {
        return this._state;
    }

    public set state(newState: any) {
        for (let i in newState) {
            if (this.binded[i]) {
                this.binded[i].updateContent(newState[i]);
            }
        }
    }

    public bind(variableName: string, element: element) {
        this.binded[variableName] = element;
    }

    public setRenderQueue() {
        this.parantVDOM.addRenderRequests();
    }

}

export { component as default };