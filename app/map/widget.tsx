'use client';

import { useContext } from "react"
import { MapContext } from "../../components/map/provider"

export const Widget = () => {
    const context = useContext(MapContext);
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
