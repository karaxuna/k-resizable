import EventTarget from './EventTarget';
import chain from './chain';

export default class Box {
    container: HTMLElement;
    target: HTMLElement;
    sides: Array<number>;

    constructor(target: HTMLElement) {
        this.target = target;
        let container = this.container = document.createElement('div');
        container.style.boxSizing = 'border-box';
        container.style.border = 'solid 1px #4285F4';
        container.style.pointerEvents = 'none';
        container.style.position = 'absolute';
    }

    show = chain<Box, Array<number>>((sides) => {
        this.sides = sides;
        document.body.appendChild(this.container);
    })

    hide = chain<Box>(() => {
        this.sides = null;
        document.body.removeChild(this.container);
    })

    update = chain<Box, MouseEvent>(function (e) {
        let rect = this.target.getBoundingClientRect();
        this.container.style.top = rect.top + 'px';
        this.container.style.left = rect.left + 'px';
        this.container.style.width = (this.sides[0] === 1 ? e.clientX - rect.left : (rect.width + 1)) + 'px';
        this.container.style.height = (this.sides[1] === 1 ? e.clientY - rect.top : (rect.height + 1)) + 'px';
    })

    get width() {
        return this.container.offsetWidth - (this.target.offsetWidth - this.target.clientWidth) * 2;
    }

    get height() {
        return this.container.offsetHeight - (this.target.offsetHeight - this.target.clientHeight) * 2;
    }

    destroy = chain<Box>(() => {
        if (document.body.contains(this.container)) document.body.removeChild(this.container);
    })
}
