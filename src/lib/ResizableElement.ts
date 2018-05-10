import Utils from './Utils';
import EventTarget from './EventTarget';
import ResizeLine from './ResizeLine';

class ResizableElement extends EventTarget {
    static DEFAULT_AMPLITUDE = 6;

    container: HTMLElement;
    sides: Array<number>;
    resizing = false;
    line: ResizeLine = new ResizeLine();

    constructor(container) {
        super();
        this.container = container;
        this.bindEvents();

        this.on('resizestart', (e) => {
            this.resizing = true;
            this.setSides(e);
            this.line.show(this.sides, e);
        });

        this.on('resizeevaluate', (e) => {
            this.setSides(e);
        });

        this.on('resizemeasure', (e) => {
            this.line.update(e);
        });

        this.on('resizeend', (e) => {
            this.resize(e);
            this.resizing = false;
            this.updateStyles();
            this.line.hide();
        });
    }

    destroy() {
        this.unbindEvents();
    }

    bindEvents() {
        document.addEventListener('mousemove', this.handleMousemove);
        document.addEventListener('mousedown', this.handleMousedown);
        document.addEventListener('mouseup', this.handleMouseup);
    }

    unbindEvents() {
        document.removeEventListener('mousemove', this.handleMousemove);
        document.removeEventListener('mousedown', this.handleMousedown);
        document.removeEventListener('mouseup', this.handleMouseup);
    }

    resize(e) {
        if (this.sides[0] === 1) {
            this.container.style.width = Utils.getWidth(this.container) + this.sides[0] * e.movementX + 'px';
        }
        if (this.sides[1] === 1) {
            this.container.style.height = Utils.getHeight(this.container) + this.sides[1] * e.movementY + 'px';
        }
    }

    setSides(e) {
        let mouseOffset = Utils.getMouseOffset(this.container.offsetParent as HTMLElement, e);
        if (!mouseOffset) return;
        this.sides = Utils.getResizableSides(this.container, ResizableElement.DEFAULT_AMPLITUDE, mouseOffset);
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
