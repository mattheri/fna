import React from 'react';
import { Switch, Redirect, useHistory } from 'react-router-dom';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';
import { Main } from '../Main/Main';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { ContextualNavbar } from '../ContextualNavbar/ContextualNavbar';
import { router } from '../../router';
import { TransitionRoute } from '../TransitionRoute/TransitionRoute';
import { RecoilRoot } from 'recoil';
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "react-query-devtools";

function App() {
  
  return (
    <RecoilRoot>
      <ToastContainer
        hideProgressBar={true}
        position={"bottom-right"}
        autoClose={4000}
        limit={3}
        newestOnTop={true}
      />
      <ContextualNavbar />
      <Switch>
        <PrivateRoute path={router.customers}>
          <Main />
        </PrivateRoute>
        <TransitionRoute path={router.login}>
          <Login />
        </TransitionRoute>
        <TransitionRoute path={router.register}>
          <Register />
        </TransitionRoute>
        <Redirect to={router.customers} from="/" />
      </Switch>
      <footer>

      </footer>
    </RecoilRoot>
  );
}

export default App;
