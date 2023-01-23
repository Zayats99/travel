import React, { FC, RefObject, useCallback, useEffect, useRef, useState } from 'react'
import { RLayerVector } from 'rlayers'
import { Circle, LineString, Point, Polygon } from 'ol/geom'

import DrawAndModify from '../DrawAndModify'
import DrawTools from '../DrawTools'
import { GeometryFigure, TCircle, TFeature } from '../../types/GeometryFigure'

interface DrawProps {
  isOpenedDrawMenu: boolean
  /**
   * TODO: Needed a better way, to check changes on local storage, temporary realization, it should be deleted (if using graphql)
   */
  setSavedFeature: (isSaved: boolean) => void
}
type FigureKnownType = Polygon | Point | LineString

const Draw: FC<DrawProps> = ({ isOpenedDrawMenu, setSavedFeature }) => {
  const vectorRef = useRef<RLayerVector>(null)
  const [figureSource, setFigureSource] = useState<TFeature | null>(null)
  const [typeDrawing, setTypeDrawing] = useState<GeometryFigure | null>(null)
  const [isActiveModifyMode, setIsActiveModifyMode] = useState<boolean>(false)

  const resetDrawing = () => {
    setFigureSource(null)
    setIsActiveModifyMode(false)
    setTypeDrawing(null)
  }
  useEffect(() => {
    if (!isOpenedDrawMenu) {
      resetDrawing()
    }
  }, [isOpenedDrawMenu])

  const handleSelectDrawingToolType = (type: GeometryFigure) => {
    setTypeDrawing(type)
  }

  /* remove figure from drawing layout */
  const handleRemoveFigure = () => {
    if (vectorRef && vectorRef.current) {
      const features = vectorRef.current.source.getFeatures()
      vectorRef.current.source.removeFeature(features[0])
      resetDrawing()
    }
  }

  /* save figure to localStorage  */
  const handleSave = () => {
    setSavedFeature(true)

    if (figureSource && Object.keys(figureSource).length !== 0) {
      /* only for localstorage */
      const featureCollectionFromlocalStorage = localStorage.getItem('FeatureCollection')
      const newFeatureCollection: TFeature[] = featureCollectionFromlocalStorage
        ? [...JSON.parse(featureCollectionFromlocalStorage), figureSource]
        : [figureSource]
      localStorage.setItem('FeatureCollection', JSON.stringify(newFeatureCollection))
      resetDrawing()
    }
  }

  /* getting figure cordinates and type */
  const getFigureSource = useCallback((vector: RefObject<RLayerVector>) => {
    if (vector.current) {
      const features = vector.current?.source.getFeatures()
      if (features[0]?.getGeometry()?.getType() !== 'Circle') {
        const figure = features[0]?.getGeometry() as FigureKnownType
        if (figure) {
          setFigureSource({
            id: new Date().valueOf().toString(),
            type: features[0]?.getGeometry()?.getType() as GeometryFigure,
            geometries: figure.getCoordinates()
          })
        }
      } else {
        const figure = features[0]?.getGeometry() as Circle
        setFigureSource({
          id: new Date().valueOf().toString(),
          type: features[0]?.getGeometry()?.getType() as GeometryFigure,
          geometries: { center: figure.getCenter(), radius: figure.getRadius() } as TCircle
        })
      }
      setIsActiveModifyMode(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <React.Fragment>
      {isOpenedDrawMenu && (
        <DrawTools
          isShowControl={!!figureSource}
          typeDraw={typeDrawing}
          onSave={handleSave}
          onDelete={handleRemoveFigure}
          onSelectDrawToolType={handleSelectDrawingToolType}
        />
      )}

      {typeDrawing && (
        <DrawAndModify
          vectorRef={vectorRef}
          typeFigure={typeDrawing}
          isModifyMode={isActiveModifyMode}
          getFigureSource={getFigureSource}
        />
      )}
    </React.Fragment>
  )
}
Draw.displayName = 'Draw'
export default Draw
