import React from 'react';

interface IContainer extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: React.ReactNode;
    as?: "div" | "section" | "article";
    fluid?: boolean;
    classname?: string;
}

export const Container = React.forwardRef(({as: As = "section", children, fluid, classname, ...rest}: IContainer, elRef: any) => {
    
    return (
        <As ref={elRef} className={`${fluid ? "fluid" : "container"}${classname ? ` ${classname}` : ""}`} {...rest}>
            {children}
        </As>
    );
})