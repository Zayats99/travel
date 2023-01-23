import { Layers, Mode, GpsFixed, AddLocation } from '@mui/icons-material'

export type TControlPanel = {
  name: string
  tooltip: string
  state: boolean
  disabled?: boolean
  icon: React.ReactNode | null
  children?: []
}
// eslint-disable-next-line no-shadow
export const enum ButtonActionNames {
  ACTIVATE_DRAWING = 'activateDrawing',
  ADD_NEW_MARKER = 'addMarker',
  CHANGE_LAYER = 'changeLayer',
  TRACK_LOCATION = 'trackGeolocation'
}
export const controlPanelState: TControlPanel[] = [
  {
    name: ButtonActionNames.CHANGE_LAYER,
    tooltip: 'Change map layer',
    state: false,
    icon: <Layers />
  },
  {
    name: ButtonActionNames.ACTIVATE_DRAWING,
    tooltip: 'Draw figures',
    state: false,
    icon: <Mode />
  },
  {
    name: ButtonActionNames.TRACK_LOCATION,
    tooltip: 'Track geolocation',
    state: false,
    icon: <GpsFixed />
  },
  {
    name: ButtonActionNames.ADD_NEW_MARKER,
    tooltip: 'Add marker',
    state: false,
    icon: <AddLocation />
  }
]
