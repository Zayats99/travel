import { DefaultTheme } from 'styled-components'

const mainTheme: DefaultTheme = {
  colors: {
    background: '#F7F9FB'
  },
  typography: {
    fontFamily: ['Poppins', 'Arial', 'sans-serif'].join(','),
    sizes: {
      default: 16 // Used at global body element
    }
  }
}

export default mainTheme
