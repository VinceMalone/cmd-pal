import * as React from 'react';
import { render } from 'react-dom';

import { App } from './App';

// TODO: get TSDX working
(window as any).__DEV__ = true;

const root = document.getElementById('root');
render(<App />, root);
