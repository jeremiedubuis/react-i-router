import {Router, Link} from '../dist/index.esm';
import React from 'react';

export const App = ({ currentUrl }) =>
    <div id="app">
        <Router domain="localhost:3333" prefix="index" currentUrl={currentUrl} routes={{
            "/": () => <div> Home {Router.getRoute().route}</div>,
            "/article/:article": ({ params }) => <div>article, {params.article} {Router.getRoute().route}</div>,
            "/blog/?article": ({ params }) => <div>blog {params.article}</div>,
            "/queryParam": ({ queryParams }) => <ul>{ Object.keys(queryParams).map(key => <li key={key}>{key}: {queryParams[key]}</li>) }</ul>
        }}/>

        <Link activeClassName="is-active" href="/">Home</Link>
        <Link activeClassName="is-active" href="/404">404</Link>
        <Link activeClassName="is-active" href="/article/1">Article</Link>
        <button onClick={() => Router.goto('/blog')}>Blog </button>
        <button onClick={() => Router.goto('/blog/1')}>Blog 1</button>
        <button onClick={() => Router.goto('/queryParam?param=1&param2')}>Query params</button>
    </div>;
