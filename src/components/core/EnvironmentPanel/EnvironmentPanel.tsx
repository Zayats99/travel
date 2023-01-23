/* eslint-disable complexity */
import React, { useContext } from 'react'

import { AppContext } from '../../'
import * as S from './styles'

interface EnvironmentPanelProps {
  /** NODE_ENV that was used while building the application */
  nodeEnv?: string
  /** Custom environment set by us - e.g.: staging, preview, production */
  customEnv?: string
  /** The application version */
  appVersion?: string
  /** The time when the application was built - please use preval */
  builtAt?: Date
}

export const EnvironmentPanel = (props: EnvironmentPanelProps) => {
  const appInfo = useContext(AppContext)

  const resolvedValues = {
    ...appInfo,
    ...props
  }

  const formattedDate = resolvedValues.builtAt ? new Date(resolvedValues.builtAt).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }) : 'unknown'

  const formattedTime = new Intl.DateTimeFormat('en-GB', {
    hour12: false,
    hour: 'numeric',
    minute: '2-digit'
  }).format(resolvedValues.builtAt)

  return (
    <S.EnvironmentPanel>
      Environment: {resolvedValues.customEnv} | Version: {resolvedValues.appVersion} | Built Environment: {resolvedValues.nodeEnv} | Built at: {`${formattedDate} - ${formattedTime}`}
    </S.EnvironmentPanel>
  )
}

EnvironmentPanel.defaultProps = {
  visibleAtProd: false
}

EnvironmentPanel.displayName = 'EnvironmentPanel'
export default EnvironmentPanel
