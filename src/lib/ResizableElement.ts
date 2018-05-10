import Utils from './Utils';
import EventTarget from './EventTarget';
import Box from './Box';

class ResizableElement extends EventTarget {
    static DEFAULT_AMPLITUDE = 6;

    container: HTMLElement;
    sides: Array<number>;
    resizing = false;
    box: Box;

    constructor(container) {
        super();
        this.container = container;
        this.box = new Box(this.container);
        this.bindEvents();

        this.on('resizestart', (e) => {
            this.resizing = true;
            this.setSides(e);
            this.box.show(this.sides).update(e);
            document.addEventListener('mouseup', this.handleMouseup);
        });

        this.on('resizeevaluate', (e: MouseEvent) => {
            this.setSides(e);
        });

        this.on('resizemeasure', (e) => {
            this.box.update(e);
        });

        this.on('resizeend', (e) => {
            this.resize(e);
            this.resizing = false;
            this.updateStyles();
            this.box.hide();
            document.removeEventListener('mouseup', this.handleMouseup);
        });
    }

    destroy() {
        this.unbindEvents();
        this.box.destroy();
    }

    bindEvents() {
        document.addEventListener('mousemove', this.handleMousemove);
        document.addEventListener('mousedown', this.handleMousedown);
    }

    unbindEvents() {
        document.removeEventListener('mousemove', this.handleMousemove);
        document.removeEventListener('mousedown', this.handleMousedown);
    }

    resize(e) {
        if (this.sides[0] === 1) {
            this.container.style.width = this.box.width - (this.container.offsetWidth - this.container.clientWidth) * 2 + 'px';
        }
        if (this.sides[1] === 1) {
            this.container.style.height = this.box.height - (this.container.offsetHeight - this.container.clientHeight) * 2 + 'px';
        }
    }

    setSides(e) {
        this.sides = Utils.getResizableSides(this.container, ResizableElement.DEFAULT_AMPLITUDE, e);
        this.updateStyles();
    }

    updateStyles() {
        let style = this.container.style,
            sides = this.sides;

        if (sides.some(side => !!side)) {
            style.userSelect = 'none';

            if (sides.every(side => !!side)) {
                style.cursor = 'move';
            }
            else if (sides[0]) {
                style.cursor = 'col-resize';
            }
            else if (sides[1]) {
                style.cursor = 'row-resize';
            }
        }
        else {
            style.userSelect = 'default';
            style.cursor = 'default';
        }
    }

    handleMousedown = (e) => {
        if (this.sides.some(side => !!side)) {
            this.trigger('resizestart', e);
        }
    }

    handleMousemove = (e) => {
        if (this.resizing) {
            this.trigger('resizemeasure', e);
        }
        else {
            this.trigger('resizeevaluate', e);
        }
    }

    handleMouseup = (e) => {
        if (this.resizing) {
            this.trigger('resizeend', e);
        }
    }
}

export default ResizableElement;
