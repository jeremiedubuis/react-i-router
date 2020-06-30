import React from 'react';
import { Router } from './Router';
import {withRoute} from '../helpers/withRoute';
import type {IRouteMatch} from '../Router';
import {pathPartsParse} from '../helpers/pathPartsParse';

interface ILinkProps {
    activeClassName?: string,
    className?: string,
    external?: boolean,
    href: string,
    route: IRouteMatch
}

class _Link extends React.Component<ILinkProps> {

    render() {
        const {
            activeClassName,
            className,
            external,
            children,
            href,
            route,
            ...rest
        } = this.props;
        return <a href={href} {...rest} onClick={this.onClick} className={this.getClassName()}>
            {children}
        </a>
    }

    onClick = e => {
        if (!this.props.external) {
            e.preventDefault();
            Router.goto(this.props.href);
        }

    };

    getClassName() {
        if (this.props.activeClassName && this.isActive()) {
            return (this.props.className && `${this.props.className} `  || '')+this.props.activeClassName;
        }
        return this.props.className;
    }

    isActive = (): boolean => {
        if (!this.props.href || !this.props.route.route) return this.props.route.currentPath === '/404' && /^(\/)?404$/.test(this.props.href);
        const { matches } = pathPartsParse(this.props.href.split('/'), this.props.route.route);
        return matches;
    }
}

export const Link = withRoute(_Link);
