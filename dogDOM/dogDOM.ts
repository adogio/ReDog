import S from './static';
import component from './component';
import parse from './parser';
import props from './props';
import redog from '../src/ReDog';

class dogDOM {
    private rootComponent: component;
    private domHooker: redog;
    private renderTimer: number;
    private intervalCleaner: number;

    public constructor(dom: string, redog: redog) {
        this.domHooker = redog;
        this.rootComponent = new component(dom, this);
        this.renderTimer = 0;
    }

    public getDomElement(): HTMLElement {
        return this.rootComponent.getDomElement();
    }

    public renderString(): string {
        return this.rootComponent.renderString();
    }

    public render(): Node {
        return this.rootComponent.render();
    }

    public addRenderRequests(): void {
        this.renderTimer += 1;

        const interval = () => {
            this.renderTimer -= 1;
            if (this.renderTimer <= 0) {
                this.domHooker.reRender();
                this.renderTimer = 0;
                clearTimeout(this.intervalCleaner);
            } else {
                clearTimeout(this.intervalCleaner);
                this.intervalCleaner = setTimeout(interval, this.renderTimer * 30);
            }
        }

        clearTimeout(this.intervalCleaner);
        this.intervalCleaner = setTimeout(interval, this.renderTimer * 30);
    }
}
export { dogDOM as default }