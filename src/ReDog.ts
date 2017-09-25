import vdom from '../dogDOM/dogDOM';

export default class {
    private rootElement: any;
    private rootDOM: vdom;
    constructor(docelement) {
        this.rootElement = docelement;
    }

    mount() {
        this.rootElement.innerHTML = this.rootDOM.render();
    }
}