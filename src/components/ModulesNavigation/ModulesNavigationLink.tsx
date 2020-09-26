import React from 'react';
import { Link } from 'react-router-dom';

type Props = { to: string, text: string, classname: string };

export class ModulesNavigationLink extends React.Component<Props> {
    render() {
        return (
            <Link className={`button ${this.props.classname && this.props.classname}`} data-text={this.props.text} to={this.props.to}>{this.props.text}</Link>
        );
    }
}
