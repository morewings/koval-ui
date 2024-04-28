import type {FC, ReactNode} from 'react';
import {useContext, createContext} from 'react';

const TabsContext = createContext<string>('');

export const useActiveTab = () => useContext(TabsContext);

export const TabsProvider: FC<{children?: ReactNode; value: string}> = ({children, value}) => {
    const {Provider} = TabsContext;
    return <Provider value={value}>{children}</Provider>;
};
