import React from 'react';
import { Router } from '../components/Router';
import type {IRouteMatch} from '../Router';
import { RouterEvent } from '../Router';

interface IWithRouteProps {
    Component: Function,
    componentProps: object
}

interface IWithRouteState {
    route: IRouteMatch
}

class WithRoute extends React.Component<IWithRouteProps, IWithRouteState> {

    constructor(props) {
        super(props);
        this.state = {
            route: Router.getRoute()
        };
    }
    componentDidMount() {
        Router.addListener(RouterEvent.Update, this.onUpdate);
    }

    componentWillUnmount() {
        Router.removeListener(RouterEvent.Update, this.onUpdate)
    }

    onUpdate = (route) => this.setState({ route });

    render() {
        const { Component, componentProps } = this.props;
        return <Component {...componentProps} route={this.state.route} />;
    }

}

export const withRoute = Component => props => <WithRoute Component={Component} componentProps={props} />;
