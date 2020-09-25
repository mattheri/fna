import React from 'react';
import { Container } from '../../Container/Container';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentRetirementState, retirementState } from '../../Context/FnaRecoilState';
import { RetirementDetails } from "../../../engine/Retirement";
import { Form } from '../../Form/Form';
import { Input } from '../../Input/Input';
import { List } from '../../List/List';
import { ListItem } from '../../List/ListItem';

export const Retirement = () => {
    const currRetirement = useRecoilValue(currentRetirementState);
    const [retirement, setRetirement] = useRecoilState(retirementState);
    const [retirementValues, setRetirementValues] = React.useState({
        goal: "",
        age: (retirement.retirementAge as number).toString()
    });

    React.useEffect(() => {
        if (Object.values(retirementValues).every(v => !!(v)) || currRetirement.goal) {
            const r = new RetirementDetails(parseInt(retirementValues.goal) || currRetirement.goal, parseInt(retirementValues.age), currRetirement.lifeExpectancy);
            setRetirement(prev => (Object.assign({}, prev, { ...r })));
        }
    }, [retirementValues, currRetirement.lifeExpectancy])
    
    return (
        <Container fluid classname="module">
            <Container fluid classname="container" data-content="Retirement">
                <Form stateToUpdate={[retirementValues, setRetirementValues]}>
                    <Input id="retirement-goal" label="Retirement Goal" multi value={currRetirement.goal > 0 ? currRetirement.goal.toString() : "" || retirementValues.goal} />
                    <Input id="retirement-age" label="Start retirement at..." multi value={currRetirement.retirementAge.toString() !== "NaN" ? currRetirement.retirementAge.toString() || retirementValues.age : retirementValues.age} />
                </Form>
            </Container>
            <List>
                <div className="list-bar">
                    <span>Age</span>
                    <span>Gross</span>
                    <span>Federal Taxes</span>
                    <span>Provincial Taxes</span>
                    <span>Net</span>
                    <span>Difference</span>
                </div>
                {currRetirement.income.map((d: any, i: number) => <ListItem>
                    <span>{currRetirement.retirementAge + i}</span>
                    <span>{d.gross.toFixed(2)}</span>
                    <span>{d.federalTax.toFixed(2)}</span>
                    <span>{d.provincialTax.toFixed(2)}</span>
                    <span>{d.net.toFixed(2)}</span>
                    <span>{(d.net - currRetirement.goal).toFixed(2)}</span>
                </ListItem>)}
            </List>
        </Container>
    );
}
