import Utils from './Utils';
import EventTarget from './EventTarget';

abstract class ResizableElement extends EventTarget {
    static DEFAULT_AMPLITUDE = 6;

    container: HTMLElement;
    resizables = [];
    resizing = false;

    constructor(container) {
        super();
        this.container = container;
        this.bindEvents();
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

    handleMousedown = (e) => {
        if (this.resizables.length) {
            this.resizing = true;
            this.trigger('resize', e);
        }
    }

    abstract resizeResizables(e: MouseEvent): void;
    abstract setResizables(e: MouseEvent): void;

    handleMousemove = (e) => {
        if (this.resizing) {
            this.resizeResizables(e);
            //Utils.resizeResizables(this.resizables, e.movementX, e.movementY);
        }
        else {
            this.setResizables(e);
            this.updateStyles();
        }
    }

    handleMouseup = (e) => {
        if (this.resizing) {
            this.resizing = false;
            this.setResizables(e);
        }
    }

    // setResizables(e) {
    //     let mouseOffset = Utils.getMouseOffset(this.parent, e);

    //     if (!mouseOffset) {
    //         return;
    //     }

    //     let resizable;
    //     if (this.container.tagName.toLowerCase() === 'table') {
    //         resizable = Utils.getTableResizableCell(this.matrix, mouseOffset, Resizable.DEFAULT_AMPLITUDE);
    //     }
    //     else {
    //         let sides = Utils.getResizableSides(this.container, Resizable.DEFAULT_AMPLITUDE, mouseOffset);

    //         if (sides.some(side => side !== 0)) {
    //             resizable = {
    //                 element: this.container,
    //                 sides
    //             };
    //         }
    //     }

    //     this.resizables = resizable ? [resizable] : [];
    //     this.updateStyles();
    // }

    updateStyles() {
        if (this.resizables.length) {
            this.container.style.userSelect = 'none';

            if (this.resizables[0].sides.every(side => side)) {
                this.container.style.cursor = 'move';
            }
            else if (this.resizables[0].sides[0]) {
                this.container.style.cursor = 'col-resize';
            }
            else if (this.resizables[0].sides[1]) {
                this.container.style.cursor = 'row-resize';
            }
        }
        else {
            this.container.style.userSelect = 'default';
            this.container.style.cursor = 'default';
        }
    }
}

export default ResizableElement;
