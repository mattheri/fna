import React from 'react';

type User = {
    id: string;
}

interface IAppContext {
    isAuthenticated: boolean;
    user: User;
};

export type IAppState = [IAppContext, React.Dispatch<React.SetStateAction<IAppContext>>];

export let appContext: React.Context<IAppState>;

export const AppContextProvider = (props: { children: JSX.Element | JSX.Element[] }) => {
    
    const [appState, setAppState] = React.useState<IAppContext>({
        isAuthenticated: false,
        user: {
            id: ""
        }
    });

    appContext = React.createContext<[IAppContext, React.Dispatch<React.SetStateAction<IAppContext>>]>([appState, setAppState]);
    
    return (
        <appContext.Provider value={[appState, setAppState]}>
            {props.children}
        </appContext.Provider>
    );
}
