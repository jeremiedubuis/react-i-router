import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

ReactDOM.hydrate( <App currentUrl={window.location.pathname} />,document.getElementById('app-holder'));
