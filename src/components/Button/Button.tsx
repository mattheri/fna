import React from 'react';

interface IButton extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    onClick: (ev: React.MouseEvent<HTMLButtonElement>) => void;
    text: string | JSX.Element;
    isDisabled?: boolean;
    classname?: string;
}

export const Button = ({onClick, text, isDisabled, classname, ...rest}: IButton) => {
    return (
        <button className={`button${classname ? ` ${classname}` : ""}`} onClick={onClick} disabled={isDisabled} data-text={text} {...rest}>
            {text}
        </button>
    );
}
