import React from 'react';
import { Route, RouteProps, useLocation } from 'react-router-dom';
import { Portal } from '../Portal/Portal';
import { BlockReveal } from '../BlockReveal/BlockReveal';

interface ITransitionRoute extends RouteProps {
    children?: JSX.Element | JSX.Element[];
}

export const TransitionRoute = ({ children, ...rest }: ITransitionRoute) => {
    const [done, setDone] = React.useState(false);
    const [renderChild, setRenderChild] = React.useState(true);
    const handleAnimationDone = (value: boolean) => {
        setDone(value);
    }
    const handleRenderChild = (value: boolean) => {
        setRenderChild(value);
    }

    const location = useLocation();
    
    React.useLayoutEffect(() => {
        if (done) setDone(false);
        setRenderChild(false);
    }, [children, location])

    return (
        <Route {...rest}>
            {!done &&
                <Portal transitionDone={done}>
                    <BlockReveal animationDone={handleAnimationDone} halfwayDone={handleRenderChild} fullScreen={true} >
                        <div style={{width: "100vw", height: "100vh"}}></div>
                    </BlockReveal>
                </Portal>
            }
            {renderChild && children}
        </Route>
    );
}
