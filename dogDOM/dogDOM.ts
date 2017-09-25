import S from './static';
import element from './element';
import parse from './parser';

export default class {
    private rootElement: element;
    constructor(dom: string) {
        this.rootElement = parse(dom);
    }

    render() {
        return this.rootElement.render();
    }
}