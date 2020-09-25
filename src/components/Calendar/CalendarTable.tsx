import React from 'react';
import { Transition } from 'react-transition-group';

type Props = { right: boolean, children: JSX.Element | JSX.Element[], change: boolean };

export const CalendarTable = ({ right, children, change }: Props) => {

    const [show, setShow] = React.useState<boolean>(false);
    
    const duration = 200;

    const slideInStyles = {
        transform: `${right ? "translateX(-100%)" : "translateX(100%)"}`,
        transition: `transform ${duration}ms ease-out`
    }

    const slideOutStyles: { [key: string]: any } = {
        entering: {
            transform: "translateX(0)",
        },
        entered: {
            transform: "translateY(0)",
        },
        exiting: {
            transform: `${right ? "translateX(100%)" : "translateX(-100%)"}`
        },
        exited: {
            transform: `${right ? "translateX(100%)" : "translateX(-100%)"}`
        }
    }

    React.useEffect(() => {
        setShow(true);
    }, [children]);

    return (
        <Transition in={show} mountOnEnter unmountOnExit timeout={duration}>
            {state => (
                <tbody
                    style={{
                        ...slideInStyles,
                        ...slideOutStyles[state]
                    }}
                >
                    {children}
                </tbody>
            )}
        </Transition>
    );
};
