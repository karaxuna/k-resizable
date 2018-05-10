import * as React from 'react';
import { render } from 'react-dom';
import ResizableElement from '../lib/ResizableElement';
import './index.scss';

let resizable = new ResizableElement(document.getElementById('box'));
