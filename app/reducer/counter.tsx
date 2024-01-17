'use client';

import { useContext } from "react"
import { CounterContext } from "./provider"

export const Counter = () => {
    const context = useContext(CounterContext);
    if (!context) {
        throw new Error('Counter must be used within a CounterProvider');
    }

    const { state, dispatch } = context;

    return (
        <div>
            Counter, Count: {state.count}
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
        </div>
    );
};
