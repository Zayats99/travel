import { Coordinate } from 'ol/coordinate'

/** Type of the geometry */
export type GeometryFigure =
  | 'Point'
  | 'LineString'
  | 'LinearRing'
  | 'Polygon'
  | 'MultiPoint'
  | 'MultiLineString'
  | 'MultiPolygon'
  | 'GeometryCollection'
  | 'Circle'
/* type for figure json */
export type FigureSource = {
  type: string
  features: []
}
export type TCircle = {
  // center: [number, number]
  center: Coordinate
  radius: number
}
type TGeometries = number[] | Coordinate[][] | TCircle | Coordinate | Coordinate[]
/* type  */
export type TFeature = {
  id: string
  type: GeometryFigure
  geometries: TGeometries
}
