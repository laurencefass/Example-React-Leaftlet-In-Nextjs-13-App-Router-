"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  ZoomControl,
} from "react-leaflet";
import { useEffect, useRef, useState } from "react";
import { LatLngExpression } from "leaflet";
import { CustomMarker } from "./CustomMarker";
import { useContext } from "react";
import { MapContext } from "./map/provider";
import "leaflet-rotate";

import "leaflet/dist/leaflet.css";
import { MiniMap } from "./MiniMap";
import HamburgerContent from "./HamburgerContent/HamburgerContent";

const CenterWidget = () => {
  const context = useContext(MapContext);
  const map = useMap();
  function center() {
    const self = context?.state.self.coord;
    if (self) map.flyTo(self);
  }
  return (
    <div>
      <button onClick={center}>center</button>
    </div>
  );
};
const RotationWidget = () => {
  const map = useMap();
  const [bearing, setBearing] = useState<number>(0);
  const [handle, setHandle] = useState<any>();

  useEffect(() => {
    map.setBearing(bearing);
  }, [bearing]);

  useEffect(() => {
    console.log("page load");
    return () => {
      stop();
    };
  }, []);

  function reset() {
    setBearing(0);
  }

  function start() {
    handle && stop();
    setHandle(
      setInterval(() => {
        setBearing((bearing) => {
          return bearing + 1;
        });
      }, 100)
    );
  }

  function stop() {
    if (handle) clearInterval(handle);
  }

  return (
    <div>
      <span>
        <b>Rotate</b>
      </span>
      <button onClick={start}>start</button>
      <button onClick={stop}>stop</button>
      <button onClick={reset}>reset</button>
    </div>
  );
};

const GetMyLocation = () => {
  const map = useMap();
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("Counter must be used within a CounterProvider");
  }
  const { state, dispatch } = context;
  const selfCoord = context?.state.self.coord;

  useEffect(() => {
    if (selfCoord) {
      map.flyTo(selfCoord);
    }
  }, [map, selfCoord]);

  const getMyLocation = () => {
    console.log("getMyLocation");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log("currentPosition", position);
        let pos: LatLngExpression = [
          position.coords.latitude,
          position.coords.longitude,
        ];
        dispatch({ type: "position", payload: pos });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="get-my-location">
      <button onClick={getMyLocation}>Get My Location</button>
    </div>
  );
};

const Map = ({
  initial = [51.505, -0.09],
}: {
  initial?: LatLngExpression;
}) => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("Counter must be used within a CounterProvider");
  }
  const { state, dispatch } = context;

  return (
    <div>
      <MapContainer
        rotate={true}
        center={context.state.self.coord}
        zoom={13}
        scrollWheelZoom={true}
      >
        <div className="map-controls">
          <GetMyLocation />
          <RotationWidget />
          <CenterWidget />
          <HamburgerContent>
            <MiniMap position="bottomright" zoomDiff={-2} />
          </HamburgerContent>
          <HamburgerContent>
            <MiniMap position="bottomright" zoomDiff={2} />
          </HamburgerContent>
        </div>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CustomMarker position={context.state.self.coord} />
      </MapContainer>
    </div>
  );
};

export default Map;

// basic version using refs
// function __Map() {
//   let mapRef = useRef();

//   let state = {
//     center: [51.505, -0.091],
//     zoom: 13,
//     alpha: 0,
//   };

//   const onClick = () => {
//     if (mapRef.current) {
//       console.log("rotating map!");
//       mapRef?.current?.setBearing(state.alpha);
//       state.alpha++;
//     }
//   };

//   useEffect(() => {
//     console.log("mapRef.current", mapRef);
//   }, [mapRef]);
//   return (
//     <div onClick={onClick}>
//       <MapContainer
//         ref={mapRef}
//         center={state.center}
//         zoom={state.zoom}
//         rotate={true}
//         touchRotate={true}
//         rotateControl={{
//           closeOnZeroBearing: false,
//         }}
//         bearing={90}
//       >
//         <TileLayer
//           attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
//         />
//       </MapContainer>
//     </div>
//   );
// }

