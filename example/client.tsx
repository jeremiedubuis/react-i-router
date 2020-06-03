import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

ReactDOM.hydrate( <App currentUrl={window.location.href} />,document.getElementById('app-holder'));
