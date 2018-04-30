import Utils from './Utils';
import ResizableElement from './ResizableElement';

class ResizableTableElement extends ResizableElement {
    matrix: Array<Array<HTMLTableCellElement>>;

    constructor(container) {
        super(container);

        this.updateMatrix();
        this.on('resize', this.onResize);
    }

    updateMatrix() {
        this.matrix = Utils.getTableCellMatrix(this.container as HTMLTableElement);
    }

    onResize = () => {
        let otherResizables = Utils.getTableOtherResizableCells(this.matrix, this.resizables[0]);
        Array.prototype.push.apply(this.resizables, otherResizables);
    }

    setResizables(e) {

    }

    resizeResizables() {

    }
}

export default ResizableTableElement;
