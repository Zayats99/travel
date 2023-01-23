import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string
    }
    typography: {
      fontFamily: string
      sizes: {
        default: number
      }
    }
  }
}
