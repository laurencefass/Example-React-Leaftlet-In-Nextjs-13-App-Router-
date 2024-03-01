import { useCallback, useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  Rectangle,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEventHandlers } from "@react-leaflet/core";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

const POSITION_CLASSES = {
  bottomleft: "leaflet-bottom leaflet-left",
  bottomright: "leaflet-bottom leaflet-right",
  topleft: "leaflet-top leaflet-left",
  topright: "leaflet-top leaflet-right",
};
type PositionKey = keyof typeof POSITION_CLASSES;

const BOUNDS_STYLE = { weight: 4 };

type MinimapBoundsProps = {
  parentMap: any;
  zoom?: number;
};

type MinimapProps = {
  position: PositionKey;
  zoom?: number;
  zoomDiff?: number;
};

function MinimapBounds({ parentMap, zoom }: MinimapBoundsProps) {
  const minimap = useMap();

  // Clicking a point on the minimap sets the parent's map center
  const onClick = useCallback(
    (e: { latlng: LatLngExpression }) => {
      parentMap.setView(e.latlng, parentMap.getZoom());
    },
    [parentMap]
  );
  useMapEvent("click", onClick);
  // Keep track of bounds in state to trigger renders
  const [bounds, setBounds] = useState(parentMap.getBounds());
  const onChange = useCallback(() => {
    setBounds(parentMap.getBounds());
    // Update the minimap's view to match the parent map's center and zoom
    minimap.setView(parentMap.getCenter(), zoom);
  }, [minimap, parentMap, zoom]);

  // Listen to events on the parent map
  const handlers = useMemo(() => ({ move: onChange, zoom: onChange }), []);
  useEventHandlers({ instance: parentMap }, handlers);

  return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />;
}

export function MiniMap({ position, zoom = 10, zoomDiff }: MinimapProps) {
  const parentMap = useMap();
  const [opacity, setOpacity] = useState(1);
  //   const mapZoom = zoom || 0;

  // Extracted variables for complex expressions
  const center = parentMap.getCenter();
  const currentZoom = parentMap.getZoom();
  const z = zoomDiff ? parentMap.getZoom() + zoomDiff : zoom;

  console.log("zoom", z);

  // Memoize the minimap so it's not affected by position changes
  const minimap = <div style={{ opacity: `${opacity}` }}>
    {useMemo(
      () => (
        <MapContainer
          style={{ width: 380, height: 300 }}
          center={center}
          zoom={z}
          dragging={false}
          doubleClickZoom={false}
          scrollWheelZoom={false}
          attributionControl={false}
          zoomControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MinimapBounds parentMap={parentMap} zoom={z} />
        </MapContainer>
      ),
      [center, parentMap, z]
    )}
  </div>;

  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;
  return (
    <div className={positionClass}>
      <div className="leaflet-control leaflet-bar">{minimap}</div>
    </div>
  );
}
