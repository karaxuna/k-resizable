import * as React from 'react';
import { render } from 'react-dom';
import Resizable from '../lib/Resizable';
import './index.scss';

let resizable = new Resizable(document.getElementsByTagName('table')[0]);
