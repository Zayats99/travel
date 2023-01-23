import { FC, useEffect, useState, ChangeEvent } from 'react'
import { RFeature, RLayerVector, ROverlay, RStyle } from 'rlayers'
import { Feature, MapBrowserEvent } from 'ol'
import { Point } from 'ol/geom'
import { Coordinate } from 'ol/coordinate'
import {
  Grid,
  TextField,
  Button,
  FormControl,
  RadioGroup,
  Radio,
  FormLabel,
  FormControlLabel,
  Tooltip
} from '@mui/material'

import { styles } from './style'
import { markerIconList } from './helper'
import { useMap } from '../../hooks'
import defaultMapMarker from '../../assets/map/svg/location.svg'
import { OLOverlay } from '../ui'

type MarkerState = {
  iconTitle: string
  feature: Feature
  markerName: string
}
const defaultState: MarkerState = {
  iconTitle: 'default',
  feature: new Feature(),
  markerName: ''
}
const CustomMarker: FC = () => {
  const { map } = useMap()
  const [markerState, setMarkerState] = useState<MarkerState>(defaultState)
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)
  const [markerList, setMarkerList] = useState<MarkerState[] | []>([])
  const [pos, setPos] = useState<Coordinate>([0, 0])

  const handleAddMarker = (event: unknown) => {
    const e = event as MapBrowserEvent<UIEvent>
    const coords = e.map.getCoordinateFromPixel(e.pixel)
    setIsOpenMenu(true)
    setPos(coords)
    setMarkerState(prev => ({
      ...prev,
      feature: new Feature({ geometry: new Point(coords), uid: new Date().valueOf() })
    }))
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMarkerState({ ...markerState, [e.currentTarget.name]: e.currentTarget.value })
  }
  useEffect(() => {
    map?.addEventListener('click', handleAddMarker)

    return () => {
      map?.removeEventListener('click', handleAddMarker)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSaveMarker = () => {
    setIsOpenMenu(false)
    setMarkerState(defaultState)
    setMarkerList([...markerList, markerState])
    // save marker in db
    map?.removeEventListener('click', handleAddMarker)
  }
  const onCancel = () => {
    setIsOpenMenu(false)
    setMarkerState(defaultState)
    map?.removeEventListener('click', handleAddMarker)
  }
  return (
    <RLayerVector zIndex={3}>
      <RStyle.RStyle>
        <RStyle.RIcon src={defaultMapMarker} scale={1} />
      </RStyle.RStyle>
      {isOpenMenu && markerState.feature.get('uid') && (
        <RFeature feature={markerState.feature}>
          {/* {markerIconList.filter(icon => icon.value === markerState.iconTitle)[0].icon()} */}
          <OLOverlay position={pos}>
            <Grid container sx={styles.gridContainer}>
              <Grid container justifyContent='center'>
                <FormControl>
                  <FormLabel sx={{ textAlign: 'center' }}>Markers icon</FormLabel>
                  <RadioGroup defaultValue='default' sx={styles.iconContainer} name='iconTitle' onChange={handleChange}>
                    {markerIconList.map(({ tooltip, value, icon }) => (
                      <Tooltip key={value} title={tooltip}>
                        <FormControlLabel
                          value={value}
                          control={<Radio icon={icon()} checkedIcon={icon('primary')} />}
                          label=''
                        />
                      </Tooltip>
                    ))}
                  </RadioGroup>
                </FormControl>
              </Grid>
              <TextField
                label='Marker title'
                variant='standard'
                name='markerName'
                value={markerState?.markerName}
                onChange={handleChange}
              />
              <Grid container justifyContent='center'>
                <Button variant='text' onClick={onSaveMarker}>
                  Save
                </Button>
                <Button variant='text' onClick={onCancel}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </OLOverlay>
        </RFeature>
      )}

      {markerList.length > 0
        ? markerList.map(({ feature, markerName }) => (
            <RFeature key={feature?.get('uid')} feature={feature}>
              <ROverlay>
                {/* {markerIconList.filter(icon => icon.value === iconTitle)[0].icon()} */}
                <RStyle.RStyle>
                  <RStyle.RIcon src={defaultMapMarker} scale={1} />
                </RStyle.RStyle>

                {markerName}
              </ROverlay>
            </RFeature>
          ))
        : null}
    </RLayerVector>
  )
}
//  {/* {markers &&
//           markers.map(marker => (
//             <RFeature key={marker.get('uid')} feature={marker} onClick={handleDeleteMarker}>
//               <ROverlay>
//                <i>name</i>
//               </ROverlay>
//             </RFeature>
//           ))} */}
CustomMarker.displayName = 'CustomMarker'
export default CustomMarker
