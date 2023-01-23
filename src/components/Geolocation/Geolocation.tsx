import React, { FC, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { fromLonLat } from 'ol/proj'
import { Point, SimpleGeometry } from 'ol/geom'
// import { Geometry, Point, SimpleGeometry } from 'ol/geom'
import { Geolocation as OLGeoLoc } from 'ol'
import { Coordinate } from 'ol/coordinate'
import BaseEvent from 'ol/events/Event'
import { linear } from 'ol/easing'
import { RLayerVector, RFeature, RGeolocation, RStyle, RContextType, RContext } from 'rlayers'

import 'ol/ol.css'

import defaultMarker from '../../assets/map/svg/location.svg'

interface GeolocationProps {
  isActiveMode?: boolean | undefined
}

const Geolocation: FC<GeolocationProps> = ({ isActiveMode }) => {
  const [trackingPosition, setTrackingPosition] = useState(new Point(fromLonLat([0, 0])))
  // const [accuracy, setAccuracy] = useState(undefined as Geometry | undefined)
  const { map } = useContext<RContextType>(RContext)
  const vectorRef = useRef<RGeolocation>(null)

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        setTrackingPosition(new Point(fromLonLat([position.coords.longitude, position.coords.latitude])))
      })
    }
  }, [])
  const handleChangeLocation = useCallback(
    (e: BaseEvent) => {
      const geoloc = e.target as OLGeoLoc
      setTrackingPosition(new Point(geoloc.getPosition() as Coordinate))
      /* for accurancy circle */
      // setAccuracy(geoloc.getAccuracyGeometry() as Geometry)

      if (map) {
        map.getView()?.fit(geoloc.getAccuracyGeometry() as SimpleGeometry, {
          duration: 250,
          maxZoom: 15,
          easing: linear
        })
      }
    },
    [map]
  )
  if (!isActiveMode) {
    return null
  }
  return (
    <React.Fragment>
      <RGeolocation
        ref={vectorRef}
        // eslint-disable-next-line react/jsx-boolean-value
        tracking={true}
        trackingOptions={{ enableHighAccuracy: true }}
        onChange={handleChangeLocation}
      />
      <RLayerVector zIndex={10}>
        <RStyle.RStyle>
          <RStyle.RIcon color='red' src={defaultMarker} scale={1} anchor={[0.5, 0.8]} />
          {/* <RStyle.RStroke color='#007bff' width={3} /> */}
        </RStyle.RStyle>
        <RFeature geometry={trackingPosition} />
        {/* <RFeature geometry={accuracy} /> */}
      </RLayerVector>
    </React.Fragment>
  )
}
Geolocation.displayName = 'Geolocation'
export default Geolocation
