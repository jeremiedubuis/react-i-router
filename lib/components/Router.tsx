import React from 'react';
import { Router as RouterClass, RouterEvent } from '../Router';
import type { IRoutes, IRouteMatch} from '../router';

type tRender404 = (route: IRouteMatch) => any;

interface IRouterProps {
    domain: string,
    currentUrl: string,
    prefix?: string,
    routes?: IRoutes
}

interface IRouterState {
    route: IRouteMatch
}

let render404 = (route: IRouteMatch) => <div>
    404 NOT FOUND
</div>;

let router: RouterClass;

export class Router extends React.Component<IRouterProps, IRouterState> {

    constructor(props) {
        super(props);
        router = new RouterClass(props.domain, props.currentUrl, props.prefix, props.routes);
        this.state = {
            route: router.route
        };

    }

    componentDidMount() {
        router.addListener(RouterEvent.Update, this.onUpdate);
    }

    componentWillUnmount() {
        router.removeListener(RouterEvent.Update, this.onUpdate);
    }

    static addRoute(str: string, renderFunction: Function) {
        router.addRoute(str, renderFunction);
    }

    static set404(_render404: tRender404) {
        render404 = _render404;
    }

    static goto(url: string, silent: boolean = false, replace: boolean = false) {
        router.goto(url, silent, replace);
    }

    static getRoute(): IRouteMatch {
        return router.route;
    }

    static addListener(event: RouterEvent, cb: Function) {
        router.addListener(event, cb);
        return Router;
    }

    static removeListener(event: RouterEvent, cb: Function) {
        router.removeListener(event, cb);
        return Router;
    }

    render() {

        if (this.state.route.match) {
            return typeof this.state.route.match === 'function'
            ? this.state.route.match(this.state.route)
            : this.state.route.match.render(this.state.route);
        }

        return render404(this.state.route);
    }

    onUpdate = (route) => {
        this.setState({ route });
    }

}
