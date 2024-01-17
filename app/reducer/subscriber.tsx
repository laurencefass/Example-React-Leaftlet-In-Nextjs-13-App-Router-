'use client';

import { useContext } from "react"
import { CounterContext } from "./provider"

export const Subscriber = () => {
    const context = useContext(CounterContext);

    if (!context) {
        throw new Error('Counter must be used within a CounterProvider');
    }

    const { state, dispatch } = context;

    return (
        <div>
            Client Subscriber, Count: {state.count}
        </div>
    );
};
