import React, { Dispatch, SetStateAction } from 'react';
import { Container } from '../../Container/Container';
import { Form } from '../../Form/Form';
import { Input } from '../../Input/Input';
import { Button } from '../../Button/Button';
import { Transition } from 'react-transition-group';
import { FadeIn } from '../../Animations/FadeIn';

type Props = {
    i: number,
    change: Dispatch<SetStateAction<{
        name: string;
        principal: string;
        debtType: string;
        rate: string;
        payment: string;
        numberOfPayments: string;
        index: number;
    }>>,
    sidePanelState: React.Dispatch<React.SetStateAction<{
        show: boolean;
        index: number;
    }>>,
    data: {
        name: string;
        principal: number;
        debtType: string;
        rate: number;
        payment: number;
        numberOfPayments: number;
    }
}

export const DebtForm = ({ i, change, sidePanelState, data }: Props) => {
    
    const [debt, setDebt] = React.useState({
        name: "",
        principal: "",
        debtType: "",
        rate: "",
        payment: "",
        numberOfPayments: "",
        index: i
    });

    const handleDropDown = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.persist();
        setDebt(previous => (Object.assign({}, previous, { debtType: e.target.value })));
    }

    React.useEffect(() => {
        change(debt);
    }, [debt]);
    
    return (
        <FadeIn
            trigger={!!(i + 1)}
        >
            <Container
                fluid
                classname="container"
                data-content={data.name ? data.name : debt.name}>
                <Form stateToUpdate={[debt, setDebt]}>
                    <Input id={`debts${i}-name`} label="Debt Name" value={data.name ? data.name : debt.name} multi />
                    <Input id={`debts${i}-principal`} label="Amount" value={data.principal ? (data.principal).toString() : debt.principal} multi />
                    <Input id={`debts${i}-rate`} label="Rate" value={data.rate ? (data.rate).toString() : debt.rate} multi />
                    <Input id={`debts${i}-payment`} label="Payment" value={data.payment ? (data.payment).toString() : debt.payment} multi />
                    <Input id={`debts${i}-numberOfPayments`} label="Number of payments" value={data.numberOfPayments ? (data.numberOfPayments).toString() : debt.numberOfPayments} multi />
                    <div className="input">
                        <select onChange={handleDropDown} value={debt.debtType}>
                            <option value="mortgage">Mortgage</option>
                            <option value="personal">Personal</option>
                        </select>
                    </div>
                </Form>
                <Button classname="my-1" onClick={() => sidePanelState(prev => (Object.assign({}, prev, {show: true, index: i})))} text="More information" />
            </Container>
        </FadeIn>
    );
}
