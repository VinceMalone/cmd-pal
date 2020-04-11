// eslint-disable-next-line import/order
import 'react-hot-loader';

import * as React from 'react';
import { render } from 'react-dom';

import { App } from './App';

// TODO: get TSDX working
((window as unknown) as { __DEV__: boolean }).__DEV__ = true;

const root = document.getElementById('root');
render(<App />, root);
