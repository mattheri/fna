import React, { Dispatch, SetStateAction } from 'react';
import { Container } from '../../Container/Container';
import { Button } from '../../Button/Button';
import { useRecoilState } from 'recoil';
import { debtState } from '../../Context/FnaRecoilState';
import { DebtForm } from './DebtForm';
import { DebtSidePanel } from './DebtSidePanel';
import { Mortgage, CreditCard, Personal } from '../../../engine/Debt';
import { Loader } from '../../Loader/Loader';

export const Debt = () => {

    const [debt, setDebt] = useRecoilState(debtState);
    const [holder, setHolder] = React.useState({
        name: "",
        principal: "",
        debtType: "",
        rate: "",
        payment: "",
        numberOfPayments: "",
        index: 0
    });
    const [showPanel, setShowPanel] = React.useState({
        show: false,
        index: 0
    });

    const handleAddDependant = () => {
        const debtBP = {
            name: "",
            principal: 0,
            debtType: "personal",
            rate: 0,
            payment: 0,
            numberOfPayments: 0,
            interestsOverTime: [0],
            principalOverTime: [0],
            totalInterestPaid: 0
        };

        setDebt((prev) => (Object.assign({}, prev, {debt: [...debt.debt, debtBP]})));
    }
    
    React.useLayoutEffect(() => {
        const bp = {
            name: holder.name,
            principal: parseInt(holder.principal),
            debtType: holder.debtType,
            rate: parseInt(holder.rate),
            payment: parseInt(holder.payment),
            numberOfPayments: parseInt(holder.numberOfPayments),
        };

        let debt: Mortgage | Personal;
        if (Object.values(bp).every(i => !!(i))) {
            switch (bp.debtType) {
                case "mortgage":
                    debt = new Mortgage(bp.name, bp.principal, bp.rate, bp.payment, bp.numberOfPayments);
                    break;
                default:
                    debt = new Personal(bp.name, bp.principal, bp.rate, bp.payment, bp.numberOfPayments);
            }
            console.log(debt)
        }
        if (Object.values(holder).some((d: any) => d.length > 0)) {
            setDebt(prev => Object.assign({}, prev, { debt: prev.debt.map((d, i) => i === holder.index ? Object.assign({}, d, (debt || bp)) : d) }));
        }
    }, [holder, showPanel])
    
    return (
        <Container fluid classname="debt module">
            {debt.debt.map((d, i) => <DebtForm change={setHolder} sidePanelState={setShowPanel} data={d} i={i} key={i} />)}
            <Button classname="btn" onClick={handleAddDependant} text="Ajouter une dette" />
            {showPanel.show && <DebtSidePanel data={debt.debt.filter((d, i) => showPanel.index === i)[0]} state={[showPanel, setShowPanel]} />}
        </Container>
    );
}