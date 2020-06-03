import polka from 'polka';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { App } from './App';
import sirv from 'sirv';

const renderApp = (req, res) => {
    const html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>react-routing | A simple SSR compatible react routing library</title>
        </head>
        <body>
        
        <div id="app-holder">${ReactDOMServer.renderToString(<App currentUrl={req.path} />)}</div>
        
        <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
        <script src="/example.js"></script>
        <script>
        </script>
        </body>
        </html>`;

    res.end(html);
};

polka()
    .use(sirv('public', { dev: true }))
    .get('/*', renderApp)
    .listen(3333, err => {
        if (err) throw err;
        console.log(`> Running on localhost:3333`);
    });
