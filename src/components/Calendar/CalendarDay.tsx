import React from 'react';

type Props = { d?: number, empty?: boolean, click?: (v: string) => void };

export const CalendarDay = ({ d, empty, click }: Props) => {
    
    const handleClick = () => {
        if (click) return click(`${d}`);
    }
    
    return (
        <td onClick={handleClick} className={`calendar-day${empty ? " empty" : ""}`}>{d}</td>
    );
}
