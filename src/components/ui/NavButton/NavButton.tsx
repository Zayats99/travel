import React, { FC, ReactNode } from 'react'
import { Button, ButtonProps, Tooltip, TooltipProps } from '@mui/material'

import { sx } from './style'

interface OwnProps {
  children: ReactNode | undefined
  isActive?: boolean
  tooltipTitle?: string
  tooltipPlacement?: TooltipProps['placement']
}

type NavButtonProps = OwnProps & ButtonProps

const NavButton: FC<NavButtonProps> = props => {
  const { children, tooltipTitle, isActive, tooltipPlacement, ...buttonProps } = props

  if (tooltipTitle) {
    return (
      <Tooltip title={tooltipTitle} placement={tooltipPlacement || 'left-start'}>
        <Button variant='contained' sx={sx.button} style={isActive ? sx.active : undefined} {...buttonProps}>
          {children}
        </Button>
      </Tooltip>
    )
  }
  return <Button {...buttonProps}>{children}</Button>
}
NavButton.displayName = 'NavButton'
export default NavButton
