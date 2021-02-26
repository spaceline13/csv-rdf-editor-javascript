import React from 'react';
import ReactDOM from 'react-dom';
import {configure} from "mobx";
import App from './App';
import './styles/AgGridValidator.css';
import './styles/ReactTabs.css';

import registerServiceWorker from './registerServiceWorker';
configure({enforceActions: 'observed'});
ReactDOM.render(<App/>, document.getElementById('root'));

registerServiceWorker();
