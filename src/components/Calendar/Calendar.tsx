import React from 'react';
import moment from "moment";
import { CalendarTable } from './CalendarTable';
import { CalendarDay } from './CalendarDay';

type Props = {onClick: (v: string) => void }
export const Calendar = ({ onClick }: Props) => {

    const m = moment;

    const [date, setDate] = React.useState({
        d: m()
    });
    const [dir, setDir] = React.useState({d: false, c: false});
    const [showMonths, setShowMonths] = React.useState(false);
    const [showYears, setShowYears] = React.useState(false);

    const handleClick = (v: string) => {
        return onClick(`${parseInt(v) < 10 ? `0${v}` : `${v}`}/${date.d.month() < 9 ? `0${date.d.month() + 1}` : date.d.month() + 1}/${date.d.year()}`);
    }

    const getFirstDayOfMonth = () => {
        return m(date.d).startOf("month").format("d");
    }

    const setBlankDays = () => {
        const blankDays = [];
        for (let i = 0; i < parseInt(getFirstDayOfMonth()); i++) {
            blankDays.push(<CalendarDay key={i - (i * 2)} empty />);
        }

        return blankDays;
    };

    const setDaysInMonth = () => {
        const daysInMonth = [];
        for (let i = 1; i <= date.d.daysInMonth(); i++) {
            daysInMonth.push(<CalendarDay click={handleClick} key={i} d={i} />);
        }

        return daysInMonth;
    }
    
    const calendarDays = () => {
        const combined = [...setBlankDays(), ...setDaysInMonth()];
        const rows: JSX.Element[][] = [];
        let cells: JSX.Element[] = [];

        combined.forEach((r, i) => {
            if (i % 7 !== 0) {
                cells.push(r);
            } else {
                rows.push(cells);
                cells = [];
                cells.push(r);
            }

            if (i === combined.length - 1) rows.push(cells);
        });

        return rows.map((d, i) => <tr key={i + 100}>{d}</tr>)
    }
    
    const handleChangeMonth = (ev: React.MouseEvent<HTMLDivElement>) => {
        const addMonth = ev.currentTarget.classList.contains("next");
        if (addMonth) {
            setDate(previous => (Object.assign({}, previous, { d: m(date.d).add(1, "M") })));
            setDir({d: false, c: !dir.c});
        } else {
            setDate(previous => (Object.assign({}, previous, { d: m(date.d).subtract(1, "M") })));
            setDir({d: true, c: !dir.c});
        }
    }

    const handleSetValue = (value: string | number) => {
        if (typeof value === "string") date.d.month(value);
        if (typeof value === "number") date.d.year(value);
    }
    
    const getYears = () => {
        const years = [];

        for (let i = date.d.year(); i > date.d.year() - 100; i--) {
            years.push(i);
        };

        return years.map(y => <li onClick={() => handleSetValue(y)} key={y}>{y}</li>)
    }

    return (
        <div className="calendar">
            <div className="controls">
                <div onClick={handleChangeMonth} className="prev controls-btn">&#60;</div>
                <span onClick={() => {
                    setShowMonths(!showMonths);
                    setShowYears(false);
                }}>
                    {date.d.month(date.d.get("M")).format("MMMM")}
                    {showMonths &&
                        <ul>
                            {moment.months().map(m => <li onClick={() => handleSetValue(m)} className="months" key={m}>{m}</li>)}
                        </ul>
                    }
                </span>
                <span onClick={() => {
                    setShowYears(!showYears);
                    setShowMonths(false);
                }}>
                    {date.d.year()}
                    {showYears &&
                        <ul className="years">
                            {getYears()}
                        </ul>
                    }
                </span>
                <div onClick={handleChangeMonth} className="next controls-btn">&#62;</div>
            </div>
            <table>
                <thead>
                    <tr>
                        {moment.weekdaysShort().map(day => <th key={day} className="day">{day}</th>)}
                    </tr>
                </thead>
                <CalendarTable right={dir.d} change={dir.c}>
                    {calendarDays()}
                </CalendarTable>
            </table>
        </div>
    );
};
