'use client';

import React, { createContext, useReducer, Dispatch } from 'react';
import { CounterState, CounterAction, counterReducer} from './reducer';

// Create a Context
type CounterContextType = {
    state: CounterState;
    dispatch: Dispatch<CounterAction>;
};

export const CounterContext = createContext<CounterContextType | undefined>(undefined);

export const CounterProvider = ({ children }: { children: React.ReactNode }) => {
    const initialState: CounterState = { count: 0 };
    const [state, dispatch] = useReducer(counterReducer, initialState);

    return (
        <CounterContext.Provider value={{ state, dispatch }}>
            {children}
        </CounterContext.Provider>
    );
};
