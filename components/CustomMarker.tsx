import MarkerIcon from '../node_modules/leaflet/dist/images/marker-icon.png'
import MarkerShadow from '../node_modules/leaflet/dist/images/marker-shadow.png'
import L from 'leaflet'
import { Marker, Popup, useMap } from 'react-leaflet'
import { LatLngExpression } from 'leaflet'
import { useEffect, useRef } from 'react'

export function CustomMarker({ position }: { position: LatLngExpression }) {
    const markerRef = useRef<L.Marker>(null); // Ref to access the marker instance
    const map = useMap();

    useEffect(() => {
        if (markerRef.current) {
            const marker = markerRef.current;
            const onDragEnd = () => {
                const newPosition = marker.getLatLng();
                console.log(`position: ${newPosition.lat}, ${newPosition.lng}`);
            };
            marker.on('dragend', onDragEnd);
            return () => {
                marker.off('dragend', onDragEnd);
            };
        }
    }, []);

    return (
        <Marker
            ref={markerRef} // Attach the ref to the Marker
            icon={new L.Icon({
                iconUrl: MarkerIcon.src,
                iconRetinaUrl: MarkerIcon.src,
                iconSize: [25, 41],
                iconAnchor: [12.5, 41],
                popupAnchor: [0, -41],
                shadowUrl: MarkerShadow.src,
                shadowSize: [41, 41],
            })}
            position={position}
            draggable={true}
        >
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker>
    );
}
