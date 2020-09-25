import React, { HTMLAttributes } from 'react';
import defaultsDeep from "lodash/fp/defaultsDeep";

interface IForm extends React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
    stateToUpdate: [any, any];
    children: JSX.Element | JSX.Element[];
}

export const Form = ({ stateToUpdate, children, ...rest }: IForm): JSX.Element => {

    const [state, setState] = stateToUpdate;

    const handleUpdateState = (value: string, id: string) => {
        const property = id.split("-")[1];
        setState((previousState: any) => defaultsDeep({ ...previousState }, { [`${property}`]: value }));
    }

    const inputChildren = React.Children.map(children, child => {
        if (Object.keys(child.props).includes("id" && "label" && "value")) return React.cloneElement(child, { change: handleUpdateState, ...child.props });
        return React.cloneElement(child, { ...child.props })
    });
    
    return (
        <form className="form" {...rest}>
            {inputChildren}
        </form>
    );
}