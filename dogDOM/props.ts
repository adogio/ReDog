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

export { props as default }