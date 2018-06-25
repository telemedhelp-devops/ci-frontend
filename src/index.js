import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createBrowserHistory as createHistory } from "history";

ReactDOM.render(<App history={createHistory()} />, document.getElementById('root'));
registerServiceWorker();
