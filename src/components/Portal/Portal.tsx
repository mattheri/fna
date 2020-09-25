import React from 'react';
import { createPortal } from "react-dom";

interface IPortal {
    children: JSX.Element | JSX.Element[];
    transitionDone: boolean;
}

export const Portal = ({children, transitionDone}: IPortal) => {
    const mount = document.getElementById("transition") as HTMLElement;

    React.useEffect(() => {
        // if (!transitionDone) {
        //     mount.style.position = "relative";
        //     mount.style.width = "100%";
        //     mount.style.height = "100vh";
        // }

        // if (transitionDone) {
        //     mount.style.position = "absolute";
        //     mount.style.width = "0";
        //     mount.style.height = "0";
        // }
    }, [transitionDone])

    return createPortal(!transitionDone && children, mount);
}