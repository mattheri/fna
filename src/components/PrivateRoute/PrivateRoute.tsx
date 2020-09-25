import React from 'react';
import { Route, useLocation, Redirect, RouteProps } from 'react-router-dom';
import { appContext, IAppState } from '../Context/AppContext';
import { TransitionRoute } from '../TransitionRoute/TransitionRoute';

interface Props extends RouteProps { children: JSX.Element | JSX.Element[] };

export const PrivateRoute = ({ children, ...rest }: Props) => {
    
    const [user, setUser] = React.useContext<IAppState>(appContext);
    const [state, setState] = React.useState(false);
    const location = useLocation();
    
    return (
        <TransitionRoute {...rest}>
            {user.isAuthenticated ?
                children : <Redirect to={{ pathname: "/login", state: {background: location} }} />
            }
        </TransitionRoute>
    );
}