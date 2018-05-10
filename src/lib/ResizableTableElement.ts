import Utils from './Utils';
import ResizableElement from './ResizableElement';

class ResizableTableElement extends ResizableElement {
    matrix: Array<Array<HTMLTableCellElement>>;

    constructor(container) {
        super(container);

        this.updateMatrix();
        this.on('resizestart', this.handleResizeStart);
        this.on('resize', this.handleResize);
        this.on('resizeevaluate', this.handleResizeEvaluate);
        this.on('resizeend', this.handleResizeEnd);
    }

    handleResizeStart = (e) => {
        let otherResizables = Utils.getTableOtherResizableCells(this.matrix, this.resizables[0]);
        Array.prototype.push.apply(this.resizables, otherResizables);
    }

    handleResize = (e) => {
        Utils.resizeResizables(this.resizables, e.movementX, e.movementY);
    }

    handleResizeEvaluate = (e) => {
        this.setResizables(e);
    }

    handleResizeEnd = (e) => {
        this.setResizables(e);
    }

    updateMatrix() {
        this.matrix = Utils.getTableCellMatrix(this.container as HTMLTableElement);
    }

    setResizables(e) {
        let mouseOffset = Utils.getMouseOffset(this.container, e);
        let resizable = Utils.getTableResizableCell(this.matrix, mouseOffset, ResizableElement.DEFAULT_AMPLITUDE);

        if (resizable) {
            this.resizables = [resizable];
        }
        else {
            this.resizables = [];
        }
    }
}

export default ResizableTableElement;
