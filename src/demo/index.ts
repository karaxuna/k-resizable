import * as React from 'react';
import { render } from 'react-dom';
import ResizableElement from '../lib/ResizableElement';
import './index.scss';

let resizable = new ResizableElement(document.getElementById('box'));

resizable.on('resizeend', ({ width, height }) => {
    if (resizable.sides[0] === 1) {
        resizable.container.style.width = width + 'px';
    }
    
    if (this.sides[1] === 1) {
        resizable.container.style.height = height + 'px';
    }
});
