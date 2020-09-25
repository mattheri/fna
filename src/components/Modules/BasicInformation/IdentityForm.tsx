import React from 'react';
import { Form } from '../../Form/Form';
import { Input } from '../../Input/Input';

type Props = {
    state: [any, any],
    values: {
        firstname: string;
        lastname: string;
        dob: string;
        age: string;
        lifeExpectancy: string;
    }
}

export const IdentityForm = ({ state, values }: Props) => {
    const [information, setInformation] = state;
    return (
        <Form stateToUpdate={[information, setInformation]}>
            <Input id="basicInformation-firstname" multi label="Firstname" value={values.firstname} />
            <Input id="basicInformation-lastname" multi label="Lastname" value={values.lastname} />
            <Input id="basicInformation-dob" calendar multi label="Date of Birth" value={values.dob} />
            <Input id="basicInformation-age" multi disabled label="Age" value={values.age} muted="Will fill itself once the date of birth is entered" />
            <Input id="basicInformation-lifeExpectancy" multi label="Life expectancy" value={values.lifeExpectancy} muted={<><span>This value is set by default </span><a href="https://en.wikipedia.org/wiki/Canada#Health" target="_blank">Source</a></>} />
        </Form>
    );
};
