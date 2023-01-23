import { FC, ReactNode } from 'react'
import { Backdrop, Box, Fade, Grid, Modal } from '@mui/material'

import { sx } from './style'

interface MapModalProps {
  open: boolean
  onClose: () => void
  children: ReactNode
}

const MapModal: FC<MapModalProps> = ({ open, children, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={open}>
        <Box sx={sx.container}>
          <Grid container sx={sx.wrapper}>
            {children}
          </Grid>
        </Box>
      </Fade>
    </Modal>
  )
}
MapModal.displayName = 'MapModal'
export default MapModal
