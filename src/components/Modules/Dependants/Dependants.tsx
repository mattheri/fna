import React, { Dispatch, SetStateAction } from 'react';
import { Container } from '../../Container/Container';
import { Button } from '../../Button/Button';
import { DependantForm } from './DependantForm';
import { useRecoilState } from 'recoil';
import { childrenState } from '../../Context/FnaRecoilState';

export const Dependants = () => {

    const [children, setChildren] = useRecoilState(childrenState);
    const [holder, setHolder] = React.useState({
        name: "",
        lastname: "",
        dob: "",
        age: "",
        index: 0
    });

    const handleAddDependant = () => {
        const dependantBP = {
            name: "",
            lastname: "",
            dob: "",
            age: ""
        };

        setChildren((prev) => (Object.assign({}, prev, {children: [...prev.children, dependantBP]})));
    }
    
    React.useLayoutEffect(() => {
        const bp = {
            name: holder.name,
            lastname: holder.lastname,
            dob: holder.dob,
            age: holder.age
        };
        if (Object.values(holder).some((d: any) => d.length > 0 && d !== "NaN")) {
            setChildren(prev => Object.assign({}, prev, { children: prev.children.map((d, i) => i === holder.index ? Object.assign({}, d, bp) : d) }));
        }
    }, [holder])
    
    return (
        <Container fluid classname="dependants module">
            {children.children.map((d, i: number) => <DependantForm
                key={i}
                change={setHolder}
                i={i}
                data={d} />)}
            <Button classname="btn" onClick={handleAddDependant} text="Add children" />
        </Container>
    );
}
