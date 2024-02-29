import { useCallback, useMemo, useState } from "react"
import { MapContainer, Rectangle, TileLayer, useMap, useMapEvent } from "react-leaflet"
import { useEventHandlers } from '@react-leaflet/core'
import { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'

const POSITION_CLASSES = {
    bottomleft: 'leaflet-bottom leaflet-left',
    bottomright: 'leaflet-bottom leaflet-right',
    topleft: 'leaflet-top leaflet-left',
    topright: 'leaflet-top leaflet-right',
}
type PositionKey = keyof typeof POSITION_CLASSES;

const BOUNDS_STYLE = { weight: 4 }

type MinimapBoundsProps = {
    parentMap: any;
    zoom?: number;
}

type MinimapProps = {
    position: PositionKey;
    zoom?: number;
}

function MinimapBounds({ parentMap, zoom }: MinimapBoundsProps) {
    const minimap = useMap()

    // Clicking a point on the minimap sets the parent's map center
    const onClick = useCallback(
        (e: { latlng: LatLngExpression }) => {
            parentMap.setView(e.latlng, parentMap.getZoom())
        },
        [parentMap],
    )
    useMapEvent('click', onClick)
    // Keep track of bounds in state to trigger renders
    const [bounds, setBounds] = useState(parentMap.getBounds())
    const onChange = useCallback(() => {
        setBounds(parentMap.getBounds())
        // Update the minimap's view to match the parent map's center and zoom
        console.log(parentMap.getCenter());
        minimap.setView(parentMap.getCenter(), zoom)
    }, [minimap, parentMap, zoom])

    // Listen to events on the parent map
    const handlers = useMemo(() => ({ move: onChange, zoom: onChange }), [])
    useEventHandlers({ instance: parentMap }, handlers)

    return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />
}

export function MiniMap({ position, zoom }: MinimapProps) {
    const parentMap = useMap()
    const mapZoom = zoom || 0

    // Memoize the minimap so it's not affected by position changes
    const minimap = useMemo(
        () => (
            <MapContainer
                style={{ height: 80, width: 120 }}
                center={parentMap.getCenter()}
                zoom={mapZoom}
                dragging={false}
                doubleClickZoom={false}
                scrollWheelZoom={false}
                attributionControl={false}
                zoomControl={false}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
            </MapContainer>
        ),
        [],
    )

    const positionClass =
        (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright
    return (
        <div className={positionClass}>
            <div className="leaflet-control leaflet-bar">{minimap}</div>
        </div>
    )
}