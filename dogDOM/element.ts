import S from './static';

class element {
    private tag: string;
    private content: string;
    private parent: element;
    private childs: Array<element>;
    constructor(tag: string, parent?: element, text?: string) {
        this.tag = tag;
        if (parent) this.parent = parent;
        if (text && tag == S.TEXT) {
            this.content = text;
        } else {
            this.childs = [];
        }
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

    public render(): string {
        let str = "";
        if (this.tag != S.TEXT && this.tag != S.ROOT) str += "<" + this.tag + ">";
        if (this.childs) {
            for (let i = 0; i < this.childs.length; i++) {
                str += this.childs[i].render();
            }
            if (this.tag != S.TEXT && this.tag != S.ROOT) str += "</" + this.tag + ">";
        } else {
            str += this.content;
        }
        return str;
    }
}
export { element as default }