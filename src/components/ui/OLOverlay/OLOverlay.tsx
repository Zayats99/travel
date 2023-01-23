import { FC, ReactNode, useEffect, useRef } from 'react'
import { Coordinate } from 'ol/coordinate'
import { Overlay } from 'ol'

import { useMap } from '../../../hooks'

interface OLOverlayProps {
  position: Coordinate
  children: ReactNode
}

const OLOverlay: FC<OLOverlayProps> = ({ position, children }) => {
  const overlayRef = useRef<HTMLDivElement>(null)
  const { map } = useMap()
  // const [coordinates, setCoordinates] = useState<Coordinate>([])
  // const setPosition = (overlay: Overlay) => {
  //   overlay.setPosition()
  // }
  useEffect(() => {
    const overlay = new Overlay({
      element: (overlayRef.current as HTMLElement) || undefined
    })
    overlay.setPosition(position)
    map?.addOverlay(overlay)
    return () => {
      map?.removeOverlay(overlay)
    }
  }, [map, position])
  return <div ref={overlayRef}>{children}</div>
}
OLOverlay.displayName = 'OLOverlay'
export default OLOverlay
