class Line {
    sides: Array<number> = [];
    element: HTMLDivElement;

    constructor(sides) {
        this.sides = sides;
        this.init();
    }

    init() {
        let element = this.element = document.createElement('div');
        element.style.position = 'absolute';
        element.style.backgroundColor = '#4285F4';
        document.body.appendChild(element);

        if (this.sides[0]) {
            element.style.top = '0';
            element.style.width = '1px';
            element.style.height = '100%';
        }
        else if (this.sides[1]) {
            element.style.left = '0';
            element.style.width = '100%';
            element.style.height = '1px';
        }
    }

    update(e) {
        if (this.sides[0]) {
            this.element.style.left = e.clientX + 'px';
        }
        else if (this.sides[1]) {
            this.element.style.top = e.clientY + 'px';
        }
    }

    destroy() {
        if (this.element.parentNode) this.element.parentNode.removeChild(this.element);
    }
}

class ResizeLine {
    lines: Array<Line> = [];

    show(sides, e) {
        if (sides[0]) {
            this.lines.push(new Line([sides[0], 0]));
        }

        if (sides[1]) {
            this.lines.push(new Line([0, sides[1]]));
        }

        this.update(e);
    }

    hide() {
        this.lines.forEach(line => {
            line.destroy();
        });
    }

    update(e) {
        this.lines.forEach(line => {
            line.update(e);
        });
    }
}

export default ResizeLine;
