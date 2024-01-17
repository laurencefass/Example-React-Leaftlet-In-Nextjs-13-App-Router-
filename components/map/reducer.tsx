import { LatLngExpression } from "leaflet";
import { produce } from 'immer';


type location = {
    coord: LatLngExpression
}

// State type
export type MapState = {
    count: number;
    self: location,
    other: Array<location> 
};

// Action types
export type MapAction = 
    | { type: 'increment' }
    | { type: 'decrement' }
    | { type: 'position', payload: LatLngExpression };

// Reducer function
export const mapReducer = (state: MapState, action: MapAction): MapState => 
    produce(state, draft => {
        switch (action.type) {
            case 'increment':
                draft.count += 1;
                break;
            case 'decrement':
                draft.count -= 1;
                break;
            case 'position': 
                console.log("reducer.coord", action);
                draft.self.coord = action.payload;
                break;
        }
    });