import React, { HTMLAttributes, ChangeEvent } from 'react';
import { Calendar } from '../Calendar/Calendar';

interface IInput extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label: string;
    id: string;
    value: string;
    calendar?: boolean;
    change?: (value: string, id: string) => void;
    muted?: string | JSX.Element | JSX.Element[];
    multi?: boolean
}

export const Input = ({
    label,
    id,
    value,
    calendar,
    change,
    muted,
    multi,
    ...rest
}: IInput) => {

    const [hasValue, setHasValue] = React.useState(false);
    const [show, setShow] = React.useState(false);
    const inputRef = React.createRef<HTMLInputElement>()

    const handleClickEvent = (newvalue: string) => {
        const ev = new Event("change", { bubbles: true });
        if (inputRef.current) {
            inputRef.current.value = newvalue;
            inputRef.current.dispatchEvent(ev);
            handleChange(ev);

            if (inputRef.current?.value) setShow(false);
        }
    }

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement> | any) => {
        const value = ev.target.value;
        const id = ev.target.id
        if (value.length) setHasValue(true);
        if (value.length < 1) setHasValue(false);
        if (change) return change(value, id);
    }

    React.useEffect(() => {
        if (value) {
            setHasValue(true);
        }
    }, [value]);
    
    return (
        <div className={`input${multi ? " multi" : ""}${hasValue ? " not-empty" : ""}${calendar ? " calendar-input" : ""}`}>
            <input onClick={() => calendar && setShow(!show)} ref={inputRef} onChange={handleChange} id={id} name={id} {...rest} value={value} readOnly={calendar} />
            <label htmlFor={id}>{label}</label>
            {muted && <small>{muted}</small>}
            {show && <Calendar onClick={handleClickEvent} />}
        </div>
    );
}
