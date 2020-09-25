import React from 'react';

interface Props {
    children: JSX.Element | JSX.Element[];
    callbackFn: () => void;
    root?: Element;
    rootMargin?: string;
    threshold?: number;
    [key: string]: any;
}

export const Observer = (props: Props) => {

    const observedRef = React.createRef<Element>();

    const observedComponents = React.Children.map(props.children, child => React.cloneElement(child, { ref: observedRef, ...props }));

    React.useEffect(() => {
        if (!observedRef) {
            return console.error("No children are available to observe. Check if children are mounted correctly before observing them.");
        }

        const options: {[key: string]: Element | number | string} = {};
        for (let i in props) {
            if (props[i] && i !== "children" && i !== "callbackFn") options[i] = props[i];
        };
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => props.callbackFn.bind(this, entry)());
        }, options);

        if (observedRef.current) observer.observe(observedRef.current);
    }, []);
    
    return (
        <>
            {observedComponents}
        </>
    );
}
