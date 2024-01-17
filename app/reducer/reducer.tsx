// State type
import { produce } from 'immer';

export type CounterState = {
    count: number;
};

// Action types
export type CounterAction = 
    | { type: 'increment' }
    | { type: 'decrement' };

// Reducer function using Immer
export const counterReducer = (state: CounterState, action: CounterAction): CounterState => 
    produce(state, draft => {
        switch (action.type) {
            case 'increment':
                draft.count += 1;
                break;
            case 'decrement':
                draft.count -= 1;
                break;
        }
    });
