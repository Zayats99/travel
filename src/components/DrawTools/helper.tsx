import { ReactNode } from 'react'
import { RadioButtonUnchecked, HexagonRounded, FiberManualRecord, Timeline } from '@mui/icons-material'

import { GeometryFigure } from '../../types/GeometryFigure'

type DrawSourse = {
  name: string
  type: GeometryFigure
  icon: ReactNode | undefined
}
export const drawTools: DrawSourse[] = [
  {
    name: 'Polygon',
    type: 'Polygon',
    icon: <HexagonRounded />
  },
  {
    name: 'Point',
    type: 'Point',
    icon: <FiberManualRecord />
  },
  {
    name: 'Circle',
    type: 'Circle',
    icon: <RadioButtonUnchecked />
  },
  {
    name: 'Line',
    type: 'LineString',
    icon: <Timeline />
  }
]
