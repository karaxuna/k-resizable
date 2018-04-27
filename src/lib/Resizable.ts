import Utils from './Utils';

class Resizable {
    container: HTMLTableElement;
    resizables;
    resizing;
    matrix;

    static DEFAULT_AMPLITUDE = 6;

    constructor(container) {
        this.container = container;
        this.resizables = [];
        this.resizing = false;

        if (this.container.tagName.toLowerCase() === 'table') {
            this.updateMatrix();
        }

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

            if (this.container.tagName.toLowerCase() === 'table') {
                Array.prototype.push.apply(this.resizables, Utils.getTableOtherResizableCells(this.matrix, this.resizables[0]))
            }
        }
    }

    handleMousemove = (e) => {
        if (this.resizing) {
            Utils.resizeResizables(this.resizables, e.movementX, e.movementY);
        }
        else {
            this.setResizables(e);
        }
    }

    handleMouseup = (e) => {
        if (this.resizing) {
            this.resizing = false;
            this.setResizables(e);
        }
    }

    updateMatrix() {
        this.matrix = Utils.getTableCellMatrix(this.container);
    }

    setResizables(e) {
        let resizable;
        if (this.container.tagName.toLowerCase() === 'table') {
            let mouseOffset = Utils.getMouseOffset(this.container, e);

            if (!mouseOffset) {
                return;
            }

            resizable = Utils.getTableResizableCell(this.matrix, mouseOffset, Resizable.DEFAULT_AMPLITUDE);
        }
        else {
            let mouseOffset = Utils.getMouseOffset(e.target.offsetParent, e);

            if (!mouseOffset) {
                return;
            }

            let sides = Utils.getResizableSides(this.container, Resizable.DEFAULT_AMPLITUDE, mouseOffset);

            if (sides.some(side => side !== 0)) {
                resizable = {
                    element: this.container,
                    sides
                };
            }
        }

        this.resizables = resizable ? [resizable] : [];
        this.updateStyles();
    }

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

export default Resizable;
