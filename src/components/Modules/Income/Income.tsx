import React from 'react';
import { Container } from '../../Container/Container';
import { Form } from '../../Form/Form';
import { Input } from '../../Input/Input';
import { IncomeDetails } from "../../../engine/Income";
import { BlockReveal } from '../../BlockReveal/BlockReveal';
import { Stats } from "./Stats";
import { useRecoilState } from 'recoil';
import { incomeState, fnaState } from '../../Context/FnaRecoilState';

export const Income = () => {
    const [income, setIncome] = React.useState({
        amount: ""
    });
    const [incomeFnaState, setIncomeFnaState] = useRecoilState(incomeState);

    const [incomeDetails, setIncomeDetails] = React.useState<[
        { gross: number },
        { net: number },
        { provincialTax: number },
        { federalTax: number },
        { EI: number },
        { QPP: number },
        { QPIP: number }
    ]>([
        { gross: incomeFnaState.gross || 0 },
        { net: incomeFnaState.net || 0 },
        { provincialTax: incomeFnaState.provincialTax || 0 },
        { federalTax: incomeFnaState.federalTax || 0 },
        { EI: incomeFnaState.EI || 0 },
        { QPP: incomeFnaState.QPP || 0 },
        { QPIP: incomeFnaState.QPIP || 0 }
    ]);

    React.useEffect(() => {
        const details = new IncomeDetails(parseInt(income.amount) || incomeFnaState.gross);
        setIncomeDetails(details.details);
        if (incomeDetails.some((s) => Object.values(s)[0])) {
            setIncomeFnaState(previous => (Object.assign({}, previous, {
                gross: details.gross,
                net: details.net,
                provincialTax: details.provincialTax,
                federalTax: details.federalTax,
                EI: details.ei,
                QPP: details.qpp,
                QPIP: details.qpip
            })));
        }
    }, [income]);

    const titles = [
        "Brut",
        "Net",
        "Taxes prvinciales",
        "Taxes fédérales",
        "AE",
        "RRQ",
        "RQAP"
    ];

    return (
        <Container fluid className="module income">
            <Container fluid classname="container" data-content="Revenus">
                <Form stateToUpdate={[income, setIncome]}>
                    <Input
                        style={{ width: `${(incomeFnaState.gross).toString().length > 2 || income.amount.length > 2 ? (incomeFnaState.gross).toString().length * 26 || income.amount.length * 26 : 54}px` }}
                        id="income-amount"
                        className="income-amount"
                        label="$"
                        value={incomeFnaState.gross ? (incomeFnaState.gross).toString() : income.amount}
                        autoComplete="off"
                        pattern="/[0-9]+/"
                        aria-label="Please put digits only"
                    />
                </Form>
            </Container>
            <section className="income-stats container" data-content="Stats">
                <div className="income-stats-container">
                    {(incomeFnaState.gross || incomeDetails.every((s) => Object.values(s)[0])) &&
                        <BlockReveal changeSettings={{hidden: true, settings: {bgColor: "#845EC2", duration: 500, delay: 50, direction: "tb"}}}>
                            {incomeDetails.map((s, i) => <Stats tax={Object.values(s)[0]} i={i} title={titles[i]} />)}
                        </BlockReveal>
                    }
                </div>
            </section>
        </Container>
    );
}
