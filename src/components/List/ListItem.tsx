import React from 'react';

interface IListItem extends React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
    children?: JSX.Element | JSX.Element[];
    text?: string;
    selectable?: boolean
}

export const ListItem = ({children, text, selectable, ...rest}: IListItem) => {
    return (
        <li className={`list-item${selectable ? " selectable": ""}`} {...rest}>
            {text && text}
            {children && children}
        </li>
    );
}
