import React from 'react';
import { Container } from '../../Container/Container';
import { Form } from '../../Form/Form';
import { Input } from '../../Input/Input';
import { userState } from "../../Context/FnaRecoilState";
import { useRecoilState } from 'recoil';
import { IdentityForm } from "./IdentityForm";
export const BasicInformation = () => {
    const [customer, setCustomer] = useRecoilState(userState);
    const [information, setInformation] = React.useState({...customer});

    React.useEffect(() => {
        let values = customer.dob.split(/[-/]/);
        if (information.dob.split(/[-/]/).some((v, i) => v !== values[i])) {
            values = information.dob.split(/[-/]/);
            const day = parseInt(values[0]);
            const month = parseInt(values[1]);
            const year = parseInt(values[2]);

            const dobDate = new Date(year, month, day);
            const today = new Date();
            const difference = Math.abs(today.getTime() - dobDate.getTime());
            setInformation(previousState => (Object.assign({}, previousState, { age: (difference / (1000 * 3600 * 24 * 365.25)).toFixed(0) })));
        }
        setCustomer(prev => (Object.assign({}, prev, { ...information })));
    }, [information, customer.dob])
    
    return (
        <Container fluid as="section" classname="basic-information module">
            <Container fluid classname="container basic-information-container" as="section" data-content="Basic Information">
                <IdentityForm state={[information, setInformation]} values={customer} />
            </Container>
            <Container fluid classname="container address-container" as="section" data-content="Address">
                <Form stateToUpdate={[information, setInformation]}>
                    <Input id="basicInformation-street" label="Street" value={customer.street} />
                    <Input id="basicInformation-city" label="City" value={customer.city} />
                    <Input id="basicInformation-country" multi label="Country" value={customer.country} />
                    <Input id="basicInformation-postalCode" multi label="Postal Code" value={customer.postalCode} />
                </Form>
            </Container>
        </Container>    
    )
}
