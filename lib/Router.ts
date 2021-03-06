import {urlToQueryParams} from './helpers/urlToQueryParams';

export interface IRouteObject {
    render: Function
}

export interface IRoutes {
    [route: string]: Function | IRouteObject
}

interface IPathMatch {
    route: string,
    params: object
}

export interface IRouteMatch {
    url: string,
    currentPath: string,
    route: string,
    match: Function | IRouteObject,
    params: object,
    queryParams: object
}

export enum RouterEvent {
    Update = 'update'
}

export class Router {

    domain: string;
    routes: object;
    prefix?: string;
    public route: IRouteMatch;
    onUpdateListeners: Function[];

    constructor(domain: string, currentUrl: string, prefix: string, routes: IRoutes = {}) {
        this.domain = domain;
        this.routes = routes;
        this.prefix = prefix;
        this.onUpdateListeners = [];

        this.route = this.parseUrl(currentUrl);
        if (typeof window !== 'undefined') {
            window.addEventListener('popstate', this.onPopState);
        }

    }

    public addRoute(string: string, renderFunction: Function) {
        this.routes[string] = renderFunction;
    }

    parseUrl(url: string = '/'): IRouteMatch {
        const queryParams = urlToQueryParams(url);
        let path = url.split('?').shift().replace(/^https?:\/\//, '').replace(this.domain, '');
        if (this.prefix) path = path.replace('/'+this.prefix, '');
        const {route, params} = this.parsePath(path);
        return {
            url,
            currentPath: path,
            route,
            match: this.routes[route],
            params,
            queryParams
        };
    }

    parsePath(path: string): IPathMatch {

        const pathParts = path.split('/');
        for (let route in this.routes) {

            const routeParts = route.split('/');
            let params = {};
            let matches = true;

            for (let i = 0, iLength = pathParts.length; i < iLength; i++) {
                if (pathParts[i] === routeParts[i]) continue;

                // if mandatory parameter
                if (/^:/.test(routeParts[i])) {
                    if (!pathParts[i]) {
                        matches = false;
                        break;
                    } else {
                        params[routeParts[i].replace(':', '')] = pathParts[i];
                    }
                } else if (/^\?/.test(routeParts[i])) {
                    if (pathParts[i]) params[routeParts[i].replace('?', '')] = pathParts[i];
                    else {
                        matches = false;
                        break;
                    }
                } else {
                    matches = false;
                    break;
                }
            }

            if (!matches) {
                params = {};
                continue;
            }

            return {
                route,
                params
            };

        }

        return {
            route: null,
            params: null
        };

    }

    onUpdate = () => {
        this.onUpdateListeners.forEach(cb => cb(this.route));
    };

    addListener = (event, cb) => {
        if (event === 'update') this.onUpdateListeners.push(cb);
    };

    removeListener = (event, cb) => {
        if (event === 'update') this.onUpdateListeners.splice(this.onUpdateListeners.indexOf(cb), 1);
    };

    goto = (url: string, silent: boolean, replace: boolean) => {
        const route = this.parseUrl(url);
        if (JSON.stringify(route) !== JSON.stringify(this.route)) {
            this.route = route;
            history[replace ? 'replaceState' : 'pushState'](null, null, (this.prefix ? '/'+this.prefix : '')+url);
            if (!silent) this.onUpdate();
        }
    };

    onPopState = () => {
        this.route = this.parseUrl(window.location.href);
        this.onUpdate();
    };


}
