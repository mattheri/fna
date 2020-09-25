import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { FNA } from '../FNA/FNA';
import { CustomerList } from '../CustomersList/CustomerList';

export const Main = () => {

    const { path } = useRouteMatch();

    return (
        <main>
            <Switch>
                <Route exact path={path}>
                    <CustomerList />
                </Route>
                <Route path={`${path}/:id`}>
                    <FNA />
                </Route>
            </Switch>
        </main>
    );
}
