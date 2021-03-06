import * as fastdom from 'fastdom';

class Utils {
    static capitalizeFirstLetter(value) {
        return value
            .charAt(0)
            .toUpperCase() + value.slice(1);
    }

    static convertPxToNumber(value) {
        return value
            ? parseInt(value.substring(0, value.lastIndexOf('px')))
            : 0;
    }

    static getWidth(element: HTMLElement, style = window.getComputedStyle(element)) {
        return this.convertPxToNumber(style.getPropertyValue('width'));
    }

    static getHeight(element: HTMLElement, style = window.getComputedStyle(element)) {
        return style.getPropertyValue('box-sizing') === 'border-box'
            ? element.offsetHeight
            : (element.clientHeight - this.getPaddingVertical(element, style));
    }

    static getPaddingVertical(element: HTMLElement, style = window.getComputedStyle(element)) {
        return this.convertPxToNumber(style.getPropertyValue('padding-top')) + this.convertPxToNumber(style.getPropertyValue('padding-bottom'));
    }

    static getBorderVertical(element: HTMLElement, style = window.getComputedStyle(element)) {
        return this.convertPxToNumber(style.getPropertyValue('border-top')) + this.convertPxToNumber(style.getPropertyValue('border-bottom'));
    }

    static getBorderSpacing(element: HTMLElement, style = window.getComputedStyle(element)) {
        return style.getPropertyValue('border-collapse') === 'collapse'
            ? 0
            : this.convertPxToNumber(style.getPropertyValue('border-spacing'));
    }

    /*
    * Resize resizables
    */
    static async resizeResizables(resizables, diffX, diffY) {
        let i,
            j,
            resizable,
            dimensions = [];

        return new Promise((resolve) => {
            fastdom.measure(() => {
                for (i = 0; i < resizables.length; i++) {
                    resizable = resizables[i];
                    dimensions[i] = {};

                    if (resizable.sides[0]) {
                        dimensions[i].width = Utils.getWidth(resizable.element) + resizable.sides[0] * diffX;
                    }
                    if (resizable.sides[1]) {
                        dimensions[i].height = Utils.getHeight(resizable.element) + resizable.sides[1] * diffY;
                    }
                }

                fastdom.mutate(() => {
                    for (i = 0; i < resizables.length; i++) {
                        resizable = resizables[i];
                        resizable.element.style.width = dimensions[i].width + 'px';
                        resizable.element.style.height = dimensions[i].height + 'px';
                    }

                    resolve();
                });
            });
        });
    }

    /*
    * Get @element's resizable sides: [x, y].
    * x = -1: Left
    * x =  1: Right
    * x =  0: Not resizable horizontally
    * y = -1: Top
    * y =  1: Bottom
    * y =  0: Not resizable vertically
    */
    static getResizableSides(element, amplitude, e: MouseEvent) {
        let rect = element.getBoundingClientRect();
        let sides: Array<number> = [];
        let inWidthRange = e.clientX >= rect.left && e.clientX <= rect.left + rect.width;
        let inHeightRange = e.clientY >= rect.top && e.clientY <= rect.top + element.offsetHeight;

        if (Math.abs(e.clientX - rect.left) <= amplitude && inHeightRange) {
            sides[0] = -1;
        } else if (Math.abs(e.clientX - (rect.left + rect.width)) <= amplitude && inHeightRange) {
            sides[0] = 1;
        } else {
            sides[0] = 0;
        }

        if (Math.abs(e.clientY - rect.top) <= amplitude && inWidthRange) {
            sides[1] = -1;
        } else if (Math.abs(e.clientY - (rect.top + element.offsetHeight)) <= amplitude && inWidthRange) {
            sides[1] = 1;
        } else {
            sides[1] = 0;
        }

        return sides;
    }

    /*
    * Update resizable element's styles
    */
    static updateResizableElementStyles(resizable: { element: HTMLElement, sides: Array<number> }) {
        let style = resizable.element.style;
        if (resizable) {
            style.userSelect = 'none';

            if (resizable.sides.every(side => !!side)) {
                style.cursor = 'move';
            }
            else if (resizable.sides[0]) {
                style.cursor = 'col-resize';
            }
            else if (resizable.sides[1]) {
                style.cursor = 'row-resize';
            }
        }
        else {
            style.userSelect = 'default';
            style.cursor = 'default';
        }
    }

    /*
    * Get @table's cell matrix
    */
    static getTableCellMatrix(table: HTMLTableElement) {
        let x = 0,
            y = 0,
            i: number,
            j: number,
            row: HTMLTableRowElement,
            cell: HTMLTableCellElement,
            cellMatrix: Array<Array<HTMLTableCellElement>> = [];

        while (true) {
            cell = cellMatrix[x]
                ? cellMatrix[x][y]
                : null;

            if (cell) {
                y += cell.rowSpan;
                continue;
            }

            if (y >= table.rows.length) {
                x++;
                y = 0;
                continue;
            }

            row = table.rows[y];

            i = x;
            while (true) {
                i--;

                if (i < 0) {
                    cell = row.cells[0];
                    break;
                } else if (cellMatrix[i][y].parentNode === row) {
                    cell = row.cells[cellMatrix[i][y].cellIndex + 1];
                    break;
                }
            }

            if (!cell) {
                break;
            }

            for (i = 0; i < cell.rowSpan; i++) {
                for (j = 0; j < cell.colSpan; j++) {
                    (cellMatrix[x + j] = cellMatrix[x + j] || [])[y + i] = cell;
                }
            }

            y += cell.rowSpan;
        }

        return cellMatrix;
    }

    /*
    * Get resizable table cell, it's sides and matrix coordinates
    */
    static getTableResizableCell(cellMatrix: Array<Array<HTMLTableCellElement>>, amplitude, e: MouseEvent) {
        amplitude = Math.max(
            amplitude,
            this.getBorderSpacing(cellMatrix[0][0].offsetParent as HTMLElement)
        );

        let x,
            y,
            sides,
            element;

        for (x = 0; x < cellMatrix.length; x++) {
            for (y = 0; y < cellMatrix[x].length; y++) {
                element = cellMatrix[x][y];
                sides = this.getResizableSides(element, amplitude, e);
                if (sides.some(side => side !== 0)) {
                    // Ignore cells edges
                    if (sides[0] === -1 && x === 0 || sides[0] === 1 && x === cellMatrix.length - 1) {
                        sides[0] = 0;
                    }

                    if (sides[1] === -1 && y === 0) {
                        sides[1] = 0;
                    }

                    // Ignore cell's bottom resize
                    if (sides[1] === -1) {
                        sides[1] = 0;
                    }

                    if (!sides.some(side => side !== 0)) {
                        continue;
                    }

                    return {
                        sides,
                        element: cellMatrix[x][y],
                        x,
                        y
                    };
                }
            }
        }
    }

    /*
    * Get table's other resizable cells
    */
    static getTableOtherResizableCells(cellMatrix: Array<Array<HTMLTableCellElement>>, resizableCell) {
        let {
            sides,
            element: cell,
            x,
            y
        } = resizableCell;

        let resizables = [],
            k;

        if (sides[0]) {
            [x, x + sides[0]].forEach((x, index) => {
                for (k = 0; k < cellMatrix.length; k++) {
                    if (!cellMatrix[x][k]) {
                        return;
                    }

                    if (cellMatrix[x][k] === cell || resizables.some(resizable => resizable.element === cellMatrix[x][k])) {
                        continue;
                    }

                    resizables.push({
                        sides: [index ? -sides[0] : sides[0], 0],
                        element: cellMatrix[x][k]
                    });
                }
            });
        }

        if (sides[1]) {
            for (k = 0; k < cellMatrix.length; k++) {
                if (!cellMatrix[k][y]) {
                    break;
                }

                if (cellMatrix[k][y] === cell || resizables.some(resizable => resizable.element === cellMatrix[x][k])) {
                    continue;
                }

                resizables.push({
                    sides: [0, sides[1]],
                    element: cellMatrix[k][y]
                });
            }
        }

        return resizables;
    }
};

export default Utils;
