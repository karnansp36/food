import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import Store from './redux/Store';
import {Provider} from 'react-redux'
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={Store}>
    <App />
  </Provider>
);
