import MarkerIcon from '../node_modules/leaflet/dist/images/marker-icon.png'
import MarkerShadow from '../node_modules/leaflet/dist/images/marker-shadow.png'
import L from 'leaflet'
import { Marker, Popup, useMap } from 'react-leaflet'
import { LatLngExpression } from 'leaflet'

export function CustomMarker({ position }: { position: LatLngExpression }) {
    const map = useMap();
    return <>
        <Marker
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
    </>
}