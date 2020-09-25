import React from 'react';
import { Transition } from 'react-transition-group';

type Props = {
    children: JSX.Element | JSX.Element[],
    trigger: boolean,
    duration?: number
};

export const FadeIn = ({duration = 300, children, trigger}: Props) => {
    const [animate, setAnimate] = React.useState(false);

    React.useEffect(() => {
        setAnimate(trigger);
    }, [animate, trigger]);

    const defaultStyles = {
        transform: "translateY(20px)",
        opacity: 0,
        transition: `all ${duration}ms ease-in-out`
    }

    const transitionStyles: {[key: string]: any} = {
        entering: {
            transform: "translateY(0px)",
            opacity: 1
        },
        entered: {
            transform: "translateY(0px)",
            opacity: 1
        },
        exiting: {
            transform: "translateY(20px)",
            opacity: 0
        },
        exited: {
            transform: "translateY(20px)",
            opacity: 0
        }
    };

    return (
        <Transition
            mountOnEnter
            in={animate}
            timeout={duration}
        >
            {state => (
                React.Children.map(children, c => React.cloneElement(c, { style: { ...defaultStyles, ...transitionStyles[state] }, ...c.props }, [c.props.children]))
            )}
        </Transition>
    );
}
