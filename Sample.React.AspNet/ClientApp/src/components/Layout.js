import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
    static displayName = Layout.name;

    render() {

        const { authenticated } = this.context;

        if (authenticated) {
            return (
                <div>
                    <NavMenu />
                    <Container>
                        {this.props.children}
                    </Container>
                </div>
            );
        }

        return (
            <div>
                {this.props.children}
            </div>);
    }
}
