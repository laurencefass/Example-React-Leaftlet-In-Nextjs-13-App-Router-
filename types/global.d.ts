import "leaflet";
import { MapContainerProps } from "react-leaflet";

declare module "leaflet" {
  interface RotatingMapOptions extends MapOptions {
    rotate?: boolean;
  }

  interface Map {
    getCircumscribedBounds(): LatLngBounds;
    getBearing(): number;
    setBearing(theta: number): void;
  }

  interface Point {
    rotate(theta: number): Point;
    rotateFrom(theta: number, pivot: Point): Point;
  }

  function map(
    element: string | HTMLElement,
    options?: RotatingMapOptions
  ): Map;
}

declare module "react-leaflet" {
  interface MapContainerProps {
    rotate?: boolean;
  }
}
