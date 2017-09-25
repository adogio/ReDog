import element from './element';

export default class {
    private rootElement: element;
    constructor() {
        this.rootElement = new element("div");
    }

    parse(dom: string) {

    }

    insert(label: string, content: string) {
        let temp = new element(label);
        if (content) temp.append(new element("text", content));
        this.rootElement.append(temp);
    }

    render() {
        return this.rootElement.render();
    }
}