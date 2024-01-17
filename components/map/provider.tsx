'use client';

import React, { createContext, useReducer, Dispatch } from 'react';
import { MapState, MapAction, mapReducer} from './reducer';

// Create a Context
type MapContextType = {
    state: MapState;
    dispatch: Dispatch<MapAction>;
};

export const MapContext = createContext<MapContextType | undefined>(undefined);

const initialState: MapState = { 
    count: 0, 
    self: {
        coord: [51.505, -0.09] 
    },
    other: []
};

export const MapProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(mapReducer, initialState);

    return (
        <MapContext.Provider value={{ state, dispatch }}>
            {children}
        </MapContext.Provider>
    );
};
