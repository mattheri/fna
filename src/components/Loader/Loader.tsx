import React from 'react';
import { Transition } from 'react-transition-group';

export const Loader = () => {

    const duration = 300;

    const defaultStyles = {
        opacity: 0,
        transition: `opacity ${duration}ms ease-in-out`
    };

    const transitionStyles: {[key: string]: any} = {
        entering: {
            opacity: 1
        },
        entered: {
            opacity: 1
        },
        exiting: {
            opacity: 0
        },
        exited: {
            opacity: 0
        },
    };

    const [show, setShow] = React.useState(false);

    React.useEffect(() => {
        setShow(true);

        return () => {
            setShow(false);
        }
    }, [])

    return (
        <Transition in={show} timeout={duration}>
            {state => (
                <div style={{
                    ...defaultStyles,
                    ...transitionStyles[state]
                }} className="loader">
                    <div className="inner-loader"></div>
                </div>
            )}
        </Transition>
    );
}
