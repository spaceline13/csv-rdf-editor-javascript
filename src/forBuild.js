import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import {configure} from "mobx";
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './styles/AgGridValidator.css';
import './styles/ReactTabs.css';

configure({enforceActions: 'observed'});

export const init = (id) => { ReactDOM.render(<App/>, document.getElementById(id)); };
registerServiceWorker();