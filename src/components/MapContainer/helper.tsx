import { Feature } from 'ol'
import { Coordinate } from 'ol/coordinate'
import { Circle, Polygon, Point, LineString, Geometry } from 'ol/geom'

import { TCircle, TFeature } from '../../types/GeometryFigure'

export interface TSourse {
  name: string
  visible: boolean
  crossOrigin: string
  attributions: string
  url: string
}
const attributions =
  '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
  '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
export const sources: TSourse[] = [
  // {
  //   name: 'Streets',
  //   visible: true,
  //   attributions,
  //   crossOrigin: 'anonymous',
  //   url: 'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=EpJ7gTfyPa46KzZqwU7q'
  // },
  // {
  //   name: 'Topo',
  //   attributions,
  //   visible: false,
  //   crossOrigin: 'anonymous',
  //   url: 'https://api.maptiler.com/maps/topo-v2/{z}/{x}/{y}.png?key=EpJ7gTfyPa46KzZqwU7q'
  // },
  {
    name: 'Streets',
    visible: true,
    attributions:
      '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    crossOrigin: 'anonymous',
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
  },
  {
    name: 'Topo',
    url: 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png',
    visible: false,
    crossOrigin: 'anonymous',
    attributions: 'Kartendaten: © OpenStreetMap-Mitwirkende, SRTM | Kartendarstellung: © OpenTopoMap (CC-BY-SA)'
  },
  {
    name: 'Satelite',
    attributions,
    visible: false,
    crossOrigin: 'anonymous',
    url: 'https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=EpJ7gTfyPa46KzZqwU7q'
  }
]
const setIdToFeature = (feature: Feature<Geometry>, id: string | number): Feature<Geometry> => {
  feature.setId(id)
  return feature
}
const createFeature = (feature: TFeature) => {
  const { type, geometries, id } = feature
  switch (type) {
    case 'Circle': {
      const { center, radius } = geometries as TCircle
      return setIdToFeature(new Feature({ geometry: new Circle(center, radius) }), id)
    }
    case 'Polygon':
      // return new Feature(new Polygon(geometries as number[] | Coordinate[][]).transform('EPSG:4326', 'EPSG:3857'))
      return setIdToFeature(new Feature(new Polygon(geometries as number[] | Coordinate[][])), id)
    case 'Point':
      return setIdToFeature(new Feature(new Point(geometries as Coordinate)), id)
    case 'LineString':
      return setIdToFeature(new Feature(new LineString(geometries as number[] | Coordinate[])), id)
    default:
      return setIdToFeature(new Feature(new Polygon(geometries as number[] | Coordinate[][])), id)
    // return undefined
  }
}
export const getAllFeatureFrom = (features: TFeature[]): Feature<Geometry>[] => {
  return features.map(feature => createFeature(feature))
}
// mock data
// [
//   {
//     type: 'Polygon',
//     geometries: [
//       [
//         [28.016330781250005, 50.794054698621636],
//         [27.48898703125, 50.09443074592585],
//         [28.851291718750005, 50.34748716321755],
//         [28.016330781250005, 50.794054698621636]
//       ]
//     ]
//   },
//   {
//     type: 'Point',
//     geometries: [10.041721406250003, 20.61276788222011]
//   },
//   {
//     type: 'GeometryCollection',
//     geometries: {
//       center: [4234132.793201959, 6893139.015223237],
//       radius: 453266.80844791513
//     }
//   },
//   {
//     type: 'LineString',
//     geometries: [
//       [54.86482104823928, 61.50763729992758],
//       [77.00052236525892, 61.23393380566009],
//       [82.14171750985702, 53.57445889823387],
//       [59.291961311643206, 59.97232628179995]
//     ]
//   }
// ]
