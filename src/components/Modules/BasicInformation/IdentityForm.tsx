import React from 'react';
import { request } from '../../../requests/requests';
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
        image: string;
    }
}

export const IdentityForm = ({ state, values }: Props) => {
    const [information, setInformation] = state;
    const [image, setImage] = React.useState(false);

    React.useEffect(() => {
        if (values.image) {
            (async () => {
                const res = await fetch("https://cors-anywhere.herokuapp.com/" + values.image);
                if (res.ok) {
                    setImage(true);
                }
            })();
        }
    }, [values.image]);

    return (
        <Form stateToUpdate={[information, setInformation]}>
            {!image ?
                <Input id="basicInformation-image" label="Ajouter une image" value={values.image} /> :
                <div className="image">
                    <img onClick={() => setImage(false)} src={values.image} />
                </div>
            }
            <Input id="basicInformation-firstname" multi label="Prénom" value={values.firstname} />
            <Input id="basicInformation-lastname" multi label="Nom de famille" value={values.lastname} />
            <Input id="basicInformation-dob" calendar multi label="Date de naissance" value={values.dob} />
            <Input id="basicInformation-age" multi disabled label="Age" value={values.age} muted="Will fill itself once the date of birth is entered" />
            <Input id="basicInformation-lifeExpectancy" multi label="Âge maximal" value={values.lifeExpectancy} muted={<><span>This value is set by default </span><a href="https://en.wikipedia.org/wiki/Canada#Health" target="_blank">Source</a></>} />
        </Form>
    );
};
