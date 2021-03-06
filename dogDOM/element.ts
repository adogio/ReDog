import props from './props';
import S from './static';
import component from './component';

class element {
    private tag: string;
    private content: string;
    private component: component;
    private props: Array<props>;
    private parent: element;
    private veryParent: element;
    private childs: Array<element>;
    private dom: HTMLElement;

    constructor(tag: string, veryParent?: element, parent?: element, text?: string) {
        this.tag = tag;
        this.props = [];
        this.dom = document.createElement(tag);
        if (parent) this.parent = parent;
        if (veryParent) { this.veryParent = veryParent; } else { this.veryParent = this }
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

    public updateContent(content: string): element {
        this.content = content;
        this.veryParent.getComponent().setRenderQueue();
        return this;
    }

    public bind(component: component) {
        this.component = component;
    }

    public appendElement(child: element): element {
        let node: element = child;
        this.childs.push(child);
        return node;
    }

    public append(tag: string, text?: string): element {
        let node: element = null;
        if (tag == S.TEXT) {
            node = new element(S.TEXT, this.veryParent, this, text);
        } else {
            node = new element(tag, this.veryParent, this);
        }
        this.childs.push(node);
        return node;
    }

    public appendText(content: string): element {
        let textNode: element = new element(S.TEXT, this.veryParent, this, content);
        this.childs.push(textNode);
        return textNode;
    }

    public appendController(variableName: string): element {
        let defaultVariable = this.veryParent.getComponent().state[variableName];
        let controllerNode: element = new element(S.TEXT, this.veryParent, this, defaultVariable)
        this.veryParent.getComponent().bind(variableName, controllerNode);
        this.childs.push(controllerNode);
        return this;
    }

    public g(): any {
        return this.tag == S.TEXT ? this.content : this.childs;
    }

    public getParent(): element {
        return this.parent;
    }

    public getVeryParent(): element {
        return this.veryParent;
    }

    public getComponent(): component {
        return this.component;
    }

    public getNode(): HTMLElement {
        return this.dom;
    }

    public render(): Node {
        this.dom = document.createElement(this.tag);
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
export { element as default }