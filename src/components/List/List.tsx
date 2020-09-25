import React from 'react';

interface IList extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
    children: JSX.Element | JSX.Element[];
};

export const List = ({children, ...rest}: IList) => {
    return (
        <ul className="list" {...rest}>
            {children}
        </ul>
    );
}