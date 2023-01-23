import React, { FC } from 'react'
import { Grid, useMediaQuery } from '@mui/material'
import { Clear, Save } from '@mui/icons-material'

import { NavButton } from '../ui'
import { GeometryFigure } from '../../types/GeometryFigure'
import { drawTools } from './helper'
import { sx } from './style'

interface SelectDrawToolProps {
  isOpen?: boolean
  isShowControl: boolean
  typeDraw: GeometryFigure | null
  onSave: () => void
  onDelete: () => void
  onSelectDrawToolType: (type: GeometryFigure) => void
}

const DrawTools: FC<SelectDrawToolProps> = props => {
  const { isShowControl, typeDraw, onSave, onDelete, onSelectDrawToolType } = props
  const matches = useMediaQuery('(max-width:375px)')
  return (
    <Grid container sx={matches ? { ...sx.container, width: '200px' } : sx.container}>
      <Grid container item sx={sx.item}>
        {drawTools.map(tool => (
          <NavButton
            key={tool.name}
            isActive={typeDraw === tool.type}
            onClick={() => onSelectDrawToolType(tool.type)}
            tooltipTitle={tool.name}
            tooltipPlacement='bottom'
          >
            {tool.icon}
          </NavButton>
        ))}
        {isShowControl && (
          <React.Fragment>
            <NavButton onClick={onSave} tooltipTitle='Save figure' tooltipPlacement='bottom'>
              <Save />
            </NavButton>
            <NavButton onClick={onDelete} tooltipTitle='Clear figure' tooltipPlacement='bottom'>
              <Clear />
            </NavButton>
          </React.Fragment>
        )}
      </Grid>
    </Grid>
  )
}

DrawTools.displayName = 'DrawTools'
export default DrawTools
