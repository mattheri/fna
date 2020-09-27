import React, { Dispatch, SetStateAction } from 'react';
import { FadeIn } from '../../Animations/FadeIn';
import { Container } from '../../Container/Container';
import { Form } from '../../Form/Form';
import { Input } from '../../Input/Input';

type Props = {
    i: number,
    change: Dispatch<SetStateAction<{ name: string; lastname: string; dob: string; age: string; index: number; }>>
    data: { name: string; lastname: string; dob: string; age: string; }
}

export const DependantForm: React.FC<Props> = ({ i, change, data }) => {
    const form = {
        name: "",
        lastname: "",
        dob: "",
        age: ""
    }
    const [dependant, setDependant] = React.useState({
        ...data || form,
        index: i
    });

    const handleDOBtoAgeConversion = (dob: string) => {
        let values = dob.split(/[-/]/);
        const day = parseInt(values[0]);
        const month = parseInt(values[1]);
        const year = parseInt(values[2]);

        const dobDate = new Date(year, month, day);
        const today = new Date();
        const difference = Math.abs(today.getTime() - dobDate.getTime());
        setDependant(previousState => (Object.assign({}, previousState, { age: (difference / (1000 * 3600 * 24 * 365.25)).toFixed(0) })));

        if (values.length < 3) {
            setDependant(prev => (Object.assign({}, prev, { age: "" })));
        }
    }

    React.useLayoutEffect(() => {
        handleDOBtoAgeConversion(dependant.dob);
    }, [dependant.dob, dependant.age])

    React.useEffect(() => {
        change(dependant);
    }, [dependant]);
    
    return (
        <FadeIn trigger={!!(i + 1)}>
            <Container fluid classname="container" data-content={dependant.name}>
                <Form stateToUpdate={[dependant, setDependant]}>
                    <Input id={`dependants${i}-name`} label="Prénom" value={dependant.name} multi />
                    <Input id={`dependants${i}-lastname`} label="Nom de famille" value={dependant.lastname} multi />
                    <Input id={`dependants${i}-dob`} label="Date de naissance" calendar value={dependant.dob} multi />
                    <Input id={`dependants${i}-age`} label="Âge" value={dependant.age} multi disabled />
                </Form>
            </Container>
        </FadeIn>
    );
}
