import React from 'react';
import anime from 'animejs';
import { Heading } from '../../Heading/Heading';

type Props = { tax: number, i: number, title: string, unit?: string };
export const Stats = ({tax, i, title, unit}: Props) => {
    const headingRef = React.useRef<HTMLHeadingElement>();
    const amount = { tax: "0$" };
    const [styles, setStyles] = React.useState({ opacity: 0 });

    React.useEffect(() => {
        anime({
            targets: amount,
            tax: `${tax}${unit ? unit : "$"}`,
            round: 1,
            easing: 'easeOutCirc',
            duration: 3000,
            delay: 500,
            update: (a) => {if (headingRef.current) headingRef.current.innerHTML = amount.tax}
        });

        setTimeout(() => {
            setStyles({ opacity: 1 });
        }, 500);
    }, [tax, headingRef])

    return (
        <div className="stat" style={styles}>
            <Heading as="h2">{title}</Heading>
            <Heading ref={headingRef} as="h3">{amount.tax}</Heading>
        </div>
    );
}
