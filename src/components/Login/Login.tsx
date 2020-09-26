import React from 'react';
import { Form } from '../Form/Form';
import { Input } from '../Input/Input';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Button } from '../Button/Button';
import { router } from '../../router';
import { request } from '../../requests/requests';
import { appContext } from '../Context/AppContext';
import { LoginBackground } from './LoginBackground';

export const Login = () => {

    const [credentials, setCredentials] = React.useState<{[key: string]: string}>({
        username: "",
        password: ""
    });

    const [isDisabled, setIsDisabled] = React.useState(true);
    const location = useLocation();
    const [, setAppState] = React.useContext(appContext);
    const history = useHistory();

    React.useLayoutEffect(() => {
        if (
            (credentials.username.length > 5 && credentials.username.includes("@")) &&
            credentials.password.length > 3
        ) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true);
        }
    }, [credentials, isDisabled]);

    const handleLogin = () => {
        request("/api/auth", "POST", {
            email: credentials.username,
            password: credentials.password
        }).then((res) => {
            if (!res.err) {
                setAppState(prev => (Object.assign({}, prev, { user: res, isAuthenticated: true })));
                history.push(router.customers);
            }

            if (!res.ok) {
                return;
            }
        });
    }
    
    
    return (
        <section className="login">
            <LoginBackground />
            <h1 className="login-hello">Hello<span>.</span></h1>
            <Form stateToUpdate={[credentials, setCredentials]}>
                <Input label="Username" type="email" id="login-username" value={credentials.username} autoComplete="username" />
                <Input label="Password" type="password" id="login-password" autoComplete="current-password" value={credentials.password} />
            </Form>
            <Button onClick={handleLogin} text="Login" isDisabled={isDisabled} />
            <h1><span><Link to={{pathname: router.register, state: {background: location}}}>Register</Link></span> to create an account<span>.</span></h1>
        </section>
    );
}
