import React from 'react';
import { BlockReveal } from '../../BlockReveal/BlockReveal';
import { Stats } from './Stats';

type Details = [
    {gross: number},
    {net: number},
    {provincialTax: number},
    {federalTax: number},
    {ei: number},
    {qpp: number},
    {qpip: number}
]

type Props = { stats: Details}

export const IncomeStats = ({ stats }: Props) => {

    const [statArray, setStatArray] = React.useState<Details>([
        { gross: 0 },
        { net: 0 },
        { provincialTax: 0 },
        { federalTax: 0 },
        { ei: 0 },
        { qpp: 0 },
        { qpip: 0 }
    ]);
    
    React.useEffect(() => {
        setStatArray(stats);
        console.log(stats);
        console.log(statArray);
    }, [stats, statArray]);
    
    return (
        <section className="income-stats container" data-content="Stats">
            {statArray.every((s, i) => Object.values(s)[i] > 0) &&
                statArray.map((s, i) => {
                    return <BlockReveal key={i} changeSettings={{hidden: true, settings: {bgColor: "#845EC2", duration: 500, delay: 200 * i, direction: "tb"}}}>
                        <Stats tax={Object.values(s)[i]} i={i} title={Object.keys(s)[0]} />
                    </BlockReveal>
                })
            }
        </section>
    )
}
