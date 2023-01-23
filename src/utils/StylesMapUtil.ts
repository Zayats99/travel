// eslint-disable-next-line import/no-duplicates
import StyleStyle, { StyleLike } from 'ol/style/Style'
import StyleCircle from 'ol/style/Circle'
import StyleFill from 'ol/style/Fill'
import StyleStroke from 'ol/style/Stroke'
import StyleText from 'ol/style/Text'
import Feature from 'ol/Feature'
// eslint-disable-next-line import/no-duplicates
import Style from 'ol/style/Style'
import Geometry, { Type } from 'ol/geom/Geometry'
import RenderFeature from 'ol/render/Feature'

import { GeometryFigure } from '../types/GeometryFigure'

export class StylesMapUtil {
  static DEFAULT_DRAW_FILL_COLOR = 'rgba(0, 183, 43, 0.5)'

  static DEFAULT_DRAW_STROKE_COLOR = 'rgba(0, 183, 43, 0.8)'

  static DEFAULT_SELECT_STYLE = StylesMapUtil.selectStyleFunction('rgba(154, 26, 56, 0.5)', 'rgba(154, 26, 56, 0.8)')
  /**
   * This function creates a select style with some default values from fill and stroke colors.
   * This can be used as a style function for OpenLayers layer or feature.
   * @param selectFillColor the color for filling features,
   * @param selectStrokeColor the stroke color features.
   * @return style object
   */
  static selectStyleFunction(selectFillColor: string, selectStrokeColor: string): StyleLike {
    return (feature: Feature<Geometry> | RenderFeature) => {
      const text = feature.get('label') ?? ''
      return new StyleStyle({
        image: new StyleCircle({
          radius: 6,
          fill: new StyleFill({
            color: selectFillColor
          }),
          stroke: new StyleStroke({
            color: selectStrokeColor
          })
        }),
        text: new StyleText({
          text,
          fill: new StyleFill({
            color: selectFillColor
          }),
          stroke: new StyleStroke({
            color: selectStrokeColor
          })
        }),
        stroke: new StyleStroke({
          color: selectStrokeColor,
          width: 3
        }),
        fill: new StyleFill({
          color: selectFillColor
        })
      })
    }
  }

  static styleFunction(featureType: GeometryFigure | Type, fillColor: string, strokeColor: string): Style | undefined {
    switch (featureType) {
      case 'MultiPoint':
      case 'Point': {
        return new StyleStyle({
          image: new StyleCircle({
            radius: 7,
            fill: new StyleFill({
              color: fillColor
            }),
            stroke: new StyleStroke({
              color: strokeColor
            })
          })
        })
      }
      case 'MultiLineString':
      case 'LineString': {
        return new StyleStyle({
          stroke: new StyleStroke({
            color: strokeColor,
            width: 2
          })
        })
      }
      case 'MultiPolygon':
      case 'Polygon':
      case 'Circle': {
        return new StyleStyle({
          fill: new StyleFill({
            color: fillColor
          }),
          stroke: new StyleStroke({
            color: strokeColor,
            width: 3
          })
        })
      }
      default:
        return undefined
    }
  }

  static defaultStyleFunction(feature: Feature<Geometry> | RenderFeature): Style | undefined {
    const geom = feature.getGeometry()
    if (!geom) {
      return undefined
    }
    return StylesMapUtil.styleFunction(geom.getType(), 'rgba(0, 0, 0, 0.6)', '#0000ff')
  }

  /**
   * The styling function for the digitize vector layer, which considers
   * different geometry types of drawn features.
   * @param typeFeature The feature type which is being styled.
   * @return The style to use.
   */

  static drawingStyleFunction(featureType: GeometryFigure | Type | undefined): Style | undefined {
    if (!featureType) {
      return undefined
    }
    return StylesMapUtil.styleFunction(
      featureType,
      StylesMapUtil.DEFAULT_DRAW_STROKE_COLOR,
      StylesMapUtil.DEFAULT_DRAW_FILL_COLOR
    )
  }
}
