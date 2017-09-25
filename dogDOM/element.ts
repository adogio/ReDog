class element {
    private label: string;
    private content: string;
    private childs: Array<element>;
    constructor(label, text?) {
        this.label = label;
        if (text && label == "text") {
            this.content = text;
        }
    }

    public append(child: element) {
        this.childs.push(child);
    }

    public text(content: string) {
        this.childs.push(new element("text", content));
    }

    public render(): string {
        switch (this.label) {
            case "img":
            case "br":
            case "hr":
                return "<" + this.label + ">";
            case "text":
                return this.content;
        }
        let childs: string = "";
        for (let i = 0; i < this.childs.length; i++) {
            childs += this.childs[i].render();
        }
        return "<" + this.label + ">" + childs + "</" + this.label + ">";

    }
}
export { element as default }