import {Router} from '../dist/index.esm';
import React from 'react';

export const App = ({ currentUrl }) =>
    <div id="app">
        <Router domain="localhost:3333" currentUrl={currentUrl} routes={{
            "/": () => <div> Home {Router.getRoute().route}</div>,
            "/article/:article": ({ params }) => <div>article, {params.article} {Router.getRoute().route}</div>,
            "/blog/?article": ({ params }) => <div>blog {params.article}</div>
        }}/>

        <button onClick={() => Router.goto('/')}>Home</button>
        <button onClick={() => Router.goto('/404')}>404</button>
        <button onClick={() => Router.goto('/article/1')}>Article 1</button>
        <button onClick={() => Router.goto('/blog')}>Blog </button>
        <button onClick={() => Router.goto('/blog/1')}>Blog 1</button>
    </div>;
