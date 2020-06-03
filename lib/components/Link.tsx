import React from 'react';
import { Router } from './Router';

interface ILinkProps {
    external: boolean,
    href: string
}

export class Link extends React.Component<ILinkProps> {

    render() {
        const {
            external,
            children,
            href,
            ...rest
        } = this.props;

        return <a href={href} {...rest} onClick={this.onClick}>
            {children}
        </a>
    }

    onClick = e => {
        if (!this.props.external) {
            e.preventDefault();
            Router.goto(this.props.href);
        }

    };
}
