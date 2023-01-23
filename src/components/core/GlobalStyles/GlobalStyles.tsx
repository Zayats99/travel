import React, { ReactNode, FunctionComponent, useEffect, RefObject, useContext, useRef } from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

import mainTheme from '../../../themes/mainTheme'
import { setMaximumScaleOnIOSWebkit } from '../../../utils'
import * as S from './styles'

interface GlobalStyleProps {
  fontFamily: string
  fontSize: number
  background: string
}

// noinspection Stylelint
export const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  html {
    font-size: ${props => props.fontSize}px;
    -webkit-text-size-adjust: 100%;
    background: ${props => props.background};
  }

  body {
    font-family: ${props => props.fontFamily};
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: ${props => props.background};
    overscroll-behavior: none;
  }

  #root, #root ~ div:not(#docs-root) {
    max-width: 100%;
    font-family: ${props => props.fontFamily};
    display: flex;
    flex: 1;
    box-sizing: border-box;

    /* Should prevent x-axis overflow on mobile */
    & > div {
      max-width: 100%;
    }

    & * {
      font-family: ${props => props.fontFamily};
    }

    /* https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/ */
    & *, & *::before, & *::after {
      box-sizing: inherit
    }
  }
`

export interface AppContextProps {
  /** The name the application (usually taken from package.json) */
  appName?: string
  /** NODE_ENV that was used while building the application */
  nodeEnv?: string
  /** Custom environment set by us - e.g.: staging, preview, production */
  customEnv?: string
  /** The application version */
  appVersion?: string
  /** The time when the application was built - please use preval */
  builtAt?: Date
  rootRef?: RefObject<HTMLDivElement>
}

export const AppContext = React.createContext<AppContextProps | undefined>(undefined)

export const useGlobalStylesRoot = () => {
  const context = useContext(AppContext)

  return context && context.rootRef ? context.rootRef.current : null
}

interface GlobalStylesProps extends AppContextProps {
  /** Content of the application */
  children?: ReactNode
  /** Name of the theme we want to use */
}

const GlobalStyles: FunctionComponent<GlobalStylesProps> = ({
  children,
  appName,
  nodeEnv,
  customEnv,
  builtAt,
  appVersion
}) => {
  useEffect(() => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
    setMaximumScaleOnIOSWebkit()
  }, [])

  const rootRef = useRef<HTMLDivElement>(null)

  return (
    <ThemeProvider theme={mainTheme}>
      <S.RootElement ref={rootRef}>
        <AppContext.Provider
          value={{
            appName,
            nodeEnv,
            customEnv,
            appVersion,
            builtAt,
            rootRef
          }}
        >
          <GlobalStyle
            fontFamily={mainTheme.typography.fontFamily}
            fontSize={mainTheme.typography.sizes.default}
            background={mainTheme.colors.background}
          />
          {children}
        </AppContext.Provider>
      </S.RootElement>
    </ThemeProvider>
  )
}

GlobalStyles.defaultProps = {
}

GlobalStyles.displayName = 'GlobalStyles'
export default GlobalStyles
