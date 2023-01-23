import compassIcon from '../../assets/map/svg/compass.svg'

export const styles = {
  map: {
    width: '100%',
    height: 'calc(100vh - 64px)'
  },
  mapContainer: {
    '.ol-rotate': {
      top: '3.3em',
      left: '0.5em',
      right: 0,
      bgcolor: 'transparent',
      '.ol-rotate-reset': {
        border: '1px solid #ccc',
        '.ol-compass': {
          color: 'transparent'
        },
        '.ol-compass::after': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: `url(${compassIcon}) no-repeat center `,
          backgroundSize: 'cover',
          width: '100%'
          // height: '18px'
        }
      }
    }
  }
}
