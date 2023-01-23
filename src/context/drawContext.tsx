import { createContext } from 'react'

export interface DrawState {
  isOpenedDrawMenu: boolean
  isActiveDrawButton: boolean
  isMobileDevise: boolean
  isActiveModifyMode: boolean
}

export interface DrawAction {
  type: ActionType
  payload?: boolean
}

// eslint-disable-next-line no-shadow
export enum ActionType {
  TOGGLE_DRAW_MENU = 'TOGGLE_DRAW_MENU',
  ACTIVATE_DRAW_BUTTON = 'ACTIVATE_DRAW_BUTTON',
  RESET_DRAWING = 'RESET_SRAWING',
  SET_DEVICE_TYPE = 'SET_DEVICE_TYPE',
  SET_MODIFY_MODE = 'SET_MODIFY_MODE'
}

type Context = {
  state: DrawState
  dispatch: React.Dispatch<DrawAction>
}
export const DrawContext = createContext<Context>({} as Context)
