import React from 'react';

interface IButtonContextNav {
    onClick: () => void;
    children: React.ReactNode | JSX.Element | JSX.Element[]
    show: boolean
}

export const ContextNavButton = ({onClick, children, show}: IButtonContextNav) => {
    return (
        <div className={`context-nav-button${show ? " show" : ""}`}>
            <div onClick={onClick} className="context-nav-button-container">
                    <div className="context-nav-buttons"></div>
                    <div className="context-nav-buttons"></div>
                    <div className="context-nav-buttons"></div>
            </div>
            {children}
        </div>
    );
}
