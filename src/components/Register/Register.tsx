import React from 'react';
import { Form } from '../Form/Form';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { request } from '../../requests/requests';
import { appContext } from '../Context/AppContext';
import { useHistory } from 'react-router-dom';
import { router } from '../../router';
import { notify } from '../Toast/Toast';

export const Register = () => {

    const [registerInfo, setRegisterInfo] = React.useState({
        emailAddress: "",
        password: "",
        reType: ""
    });

    const [passwordMatch, setPasswordMatch] = React.useState(false);
    const [isDisabled, setIsDisabled] = React.useState(true);
    const [appState, setAppState] = React.useContext(appContext);
    const history = useHistory();

    React.useEffect(() => {
        if (
            (registerInfo.password.length && registerInfo.reType.length) &&
            (registerInfo.password === registerInfo.reType)
        ) {
            setPasswordMatch(true);
        } else {
            setPasswordMatch(false);
        }

        if (
            (registerInfo.emailAddress.length > 5 && registerInfo.emailAddress.includes("@")) &&
            passwordMatch
        ) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [registerInfo, passwordMatch, isDisabled]);

    const handleRegister = () => {
        request(`/api/register`, "POST",
            { email: registerInfo.emailAddress, password: registerInfo.password }).then((res) => {
                if (!res.err) {
                    setAppState(prev => (Object.assign({}, prev, { user: res, isAuthenticated: true })));
                    history.push(router.customers);
                    notify({type: "success", msg: "User created successfully!"});
                }

                if (!res.ok) {
                    return;
                }
            });
    }

    return (
        <section className="register">
            <h1>Hello there<span>.</span></h1>
            <Form stateToUpdate={[registerInfo, setRegisterInfo]}>
                <Input id="register-emailAddress" type="email" label="Email" value={registerInfo.emailAddress} autoComplete="username" />
                <Input id="register-password" type="password" label="Set a password" value={registerInfo.password} autoComplete="new-password" />
                <Input id="register-reType" type="password" label="Type it again" value={registerInfo.reType} />
            </Form>
            <Button onClick={handleRegister} text="Register" isDisabled={isDisabled} />
            <h1><span>Nice</span> to meet you.</h1>
        </section>
    );
}
