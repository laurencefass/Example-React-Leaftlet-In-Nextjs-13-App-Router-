'use client'

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { useEffect, useState } from 'react'
import { LatLngExpression } from 'leaflet'
import { CustomMarker } from './CustomMarker'

import 'leaflet/dist/leaflet.css'

import { useContext } from "react"
import { MapContext } from "./map/provider"

// export const Widget = () => {
//     const context = useContext(MapContext);
//     if (!context) {
//         throw new Error('Counter must be used within a CounterProvider');
//     }
//     const { state, dispatch } = context;
//     return (
//         <div>
//             Counter, Count: {state.count}
//             <button onClick={() => dispatch({ type: 'increment' })}>+</button>
//             <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
//         </div>
//     );
// };

const GetMyLocation = () => {
    const map = useMap();
    const context = useContext(MapContext);
    if (!context) {
        throw new Error('Counter must be used within a CounterProvider');
    }
    const { state, dispatch } = context;
    const selfCoord = context?.state.self.coord;

    useEffect(()=>{
        if (selfCoord) {
            map.flyTo(selfCoord);    
        }
    }, [map, selfCoord])

    const getMyLocation = () => {
        console.log("getMyLocation");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log("currentPosition", position);
                let pos: LatLngExpression = [position.coords.latitude, position.coords.longitude];
                dispatch({ type: 'position', payload: pos} );
            })
        } else {
            console.log("Geolocation is not supported by this browser.")
        }
    }

    return (
        <div className="get-my-location">
            <button onClick={getMyLocation}>Get My Location</button>
        </div>
    )
}

const Map = ({initial = [51.505, -0.09]} : { initial?: LatLngExpression}) => {
    const context = useContext(MapContext);
    if (!context) {
        throw new Error('Counter must be used within a CounterProvider');
    }
    const { state, dispatch } = context;
    return (
        <div>
            <MapContainer center={context.state.self.coord} zoom={13} scrollWheelZoom={true}>
                <div className="map-controls">
                    <GetMyLocation />
                </div>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <CustomMarker position={context.state.self.coord} />
            </MapContainer>
        </div>
    )
}

export default Map