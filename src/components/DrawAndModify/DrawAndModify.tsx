import { FC, useCallback } from 'react'
import { platformModifierKeyOnly, doubleClick } from 'ol/events/condition'
import { MapBrowserEvent, RInteraction, RLayerVector } from 'rlayers'

import { GeometryFigure } from '../../types/GeometryFigure'
import { StylesMapUtil } from '../../utils'

interface DrawAndModifyProps {
  /**
   * Ref for draw layer vector - RLayerVector
   * */
  vectorRef: React.RefObject<RLayerVector>
  /**
   * Feature type for drawing figures type = "Poligon" | "Point" | "Line"
   * */
  typeFigure: GeometryFigure

  isModifyMode: boolean
  /**
   * Function for getting a figure source (coorinates, properties, type figure) from draw layer
   * */
  getFigureSource: (vector: React.RefObject<RLayerVector>) => void
}

const DrawAndModify: FC<DrawAndModifyProps> = ({ vectorRef, typeFigure, isModifyMode, getFigureSource }) => {
  return (
    <RLayerVector
      ref={vectorRef}
      zIndex={12}
      properties={{ label: 'DrawLayer' }}
      onChange={() => getFigureSource(vectorRef)}
    >
      {!isModifyMode && <RInteraction.RDraw type={typeFigure} style={StylesMapUtil.drawingStyleFunction(typeFigure)} />}

      <RInteraction.RModify
        // condition={!isMobile ? platformModifierKeyOnly : touchOnly}
        deleteCondition={useCallback((e: MapBrowserEvent<UIEvent>) => platformModifierKeyOnly(e) && doubleClick(e), [])}
      />
    </RLayerVector>
  )
}
DrawAndModify.displayName = 'DrawAndModify'
export default DrawAndModify
