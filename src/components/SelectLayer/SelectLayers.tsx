import { FC, MouseEvent } from 'react'
import { Button, Grid, Typography } from '@mui/material'

import { sources } from '../MapContainer/helper'
import { MapModal } from '../ui'
import { sx } from './style'
interface SelectLayersProps {
  isOpen: boolean
  handleToggleLayers: () => void
  selectLayer: (name: string) => void
}

const SelectLayers: FC<SelectLayersProps> = ({ isOpen, handleToggleLayers, selectLayer }) => {
  const handleSelectMapLayer = (e: MouseEvent<HTMLElement>, name: string) => {
    e.stopPropagation()
    handleToggleLayers()
    selectLayer(name)
  }
  return (
    <MapModal open={isOpen} onClose={handleToggleLayers}>
      <Grid container sx={sx.container}>
        <Typography variant='h6'>Select map layer</Typography>
        {sources.map(({ name }) => (
          <Grid container item key={name} sx={sx.itemContainer}>
            <Button
              sx={{ ...sx.itemElement, ...sx.button }}
              onClick={(event: MouseEvent<HTMLElement>) => handleSelectMapLayer(event, name)}
            >
              content
            </Button>
            <Grid container sx={{ ...sx.itemElement, ...sx.textContent }}>
              <Typography variant='body1'>{name}</Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </MapModal>
  )
}
SelectLayers.displayName = 'SelectLayers'
export default SelectLayers
