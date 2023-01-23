import { ReactNode } from 'react'
import { LocationOn, MapsHomeWork, DirectionsCar } from '@mui/icons-material'

type TColorPropsIcon = 'action' | 'primary' | 'secondary' | undefined

type TMarkerList = {
  tooltip: string
  value: string
  icon: (color?: TColorPropsIcon) => ReactNode | null
}

export const markerIconList: TMarkerList[] = [
  {
    tooltip: 'Location',
    value: 'default',
    icon: (color: TColorPropsIcon) => (color ? <LocationOn color={color} /> : <LocationOn />)
  },
  {
    tooltip: 'Building',
    value: 'building',
    icon: (color: TColorPropsIcon) => (color ? <MapsHomeWork color={color} /> : <MapsHomeWork />)
  },
  {
    tooltip: 'Car',
    value: 'car',
    icon: (color: TColorPropsIcon) => (color ? <DirectionsCar color={color} /> : <DirectionsCar />)
  }
]
