import React from 'react';
import { toast } from "react-toastify";

type Props = {
    type: "success" | "error",
    msg: string
};

export const notify = ({ type, msg }: Props) => {
    return (
        toast(msg, {
            className: "toast-notification",
            type: type
        })
    );
}
