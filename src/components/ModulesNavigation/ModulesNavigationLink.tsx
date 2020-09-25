import React from 'react';
import { Link } from 'react-router-dom';

type Props = { to: string, text: string, classname: string };

export const ModulesNavigationLink: React.FC<Props> = ({to, text, classname}) => {
    return (
        <Link className={`button ${classname && classname}`} data-text={text} to={to}>{text}</Link>
    );
}
