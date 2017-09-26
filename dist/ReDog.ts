const S = {
    DIV: "div",
    SPAN: "span",
    TEXT: "text",
    ROOT: "root"
}

class ReDog {
    private rootElement: HTMLElement;
    private rootDOM: dogDOM;

    constructor(DOMElement: HTMLElement, DOM: string) {
        this.rootElement = DOMElement;
        this.rootDOM = new dogDOM(DOM);
    }

    stringify(): string {
        return this.rootDOM.renderString();
    }

    mount(): void {
        this.rootElement.appendChild(this.rootDOM.render());
    }
}
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
class props {
    private propsName: string;
    private propsContent: any;

    constructor(propsName: string, propsContent: any) {
        this.propsName = propsName;
        this.propsContent = propsContent;
    }

    getPropsName(): string {
        return this.propsName;
    }

    getPropsContent(): any {
        return this.propsContent;
    }

}
class element {
    private tag: string;
    private content: string;
    private props: Array<props>;
    private parent: element;
    private childs: Array<element>;
    private dom: HTMLElement;
    constructor(tag: string, parent?: element, text?: string) {
        this.tag = tag;
        this.props = [];
        this.dom = document.createElement(tag);
        if (parent) this.parent = parent;
        if (text && tag == S.TEXT) {
            this.content = text;
        } else {
            this.childs = [];
        }
    }

    public setProp(propName: string, propContent: any): element {
        this.props.push(new props(propName, propContent));
        return this;
    }

    public diff() {

    }

    public change() {

    }

    public bind() {

    }

    public appendElement(child: element): element {
        let node = child;
        this.childs.push(child);
        return node;
    }

    public append(tag: string, text?: string): element {
        let node = null;
        if (tag == S.TEXT) {
            node = new element(S.TEXT, this, text);
        } else {
            node = new element(tag, this);
        }
        this.childs.push(node);
        return node;
    }

    public appendText(content: string): element {
        let textNode = new element(S.TEXT, this, content);
        this.childs.push(textNode);
        return textNode;
    }

    public g(): any {
        return this.tag == S.TEXT ? this.content : this.childs;
    }

    public getParent(): element {
        return this.parent;
    }

    public getNode(): HTMLElement {
        return this.dom;
    }

    public render(): Node {
        if (this.dom.tagName == S.TEXT.toUpperCase()) {
            this.dom.innerText = this.content;
            return this.dom.firstChild;
        } else {
            for (let i = 0; i < this.props.length; i++) {
                this.dom[this.props[i].getPropsName()] = this.props[i].getPropsContent();
            }
        }
        if (this.childs) {
            for (let i = 0; i < this.childs.length; i++) {
                let childElement: Node = this.childs[i].render();
                if (childElement) this.dom.appendChild(childElement);
            }
        } else {
            this.dom.innerHTML = this.content;
        }
        return this.dom;
    }

    public renderString(): string {
        let str = "";
        if (this.tag != S.TEXT && this.tag != S.ROOT) str += "<" + this.tag + ">";
        if (this.childs) {
            for (let i = 0; i < this.childs.length; i++) {
                str += this.childs[i].renderString();
            }
            if (this.tag != S.TEXT && this.tag != S.ROOT) str += "</" + this.tag + ">";
        } else {
            str += this.content;
        }
        return str;
    }
}

function parse(dom: string): element {
    let tree: element = new element(S.ROOT);
    let position: Array<string> = [];
    let pointer: element = tree;
    let dList: Array<string> = dom.split(/</);
    console.log(dList);
    while (dList.length > 0) {
        let dofList = dList.shift();
        let node = dofList.split(/>/);
        if (node.length == 1) {
            if (node[0]) {
                pointer = tree.appendText(node[0]);
            }
        } else if (node[0][0] == "/") {
            let lastposition = position[position.length - 1]
            if (node[0].substring(1) == lastposition) {
                pointer = pointer.getParent();
                if (node[1]) {
                    pointer.appendText(node[1]);
                }
                position.pop();
            } else {
                throw "parse error, " + lastposition + "have no close tag";
            }
        } else {
            let propsSplit = node[0].split(" ");
            let a: element = null;
            if (node[0].length == 1) {
                a = new element(node[0], pointer);
                position.push(node[0]);
            } else {
                a = new element(propsSplit[0], pointer);
                position.push(propsSplit[0]);
                for (let i = 1; i < propsSplit.length; i++) {
                    let propLR = propsSplit[i].split("=");
                    a.setProp(propLR[0], propLR[1] ? propLR[1] : true);
                }
            }
            if (node[1]) a.appendText(node[1]);
            pointer = pointer.appendElement(a);
        }
    }
    return tree;
}