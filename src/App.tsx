import { CssBaseline } from '@mui/material'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { MissingContent, MapContainer } from './components'
import { Main } from './templates/Main'
import { SignUp } from './components/SignUp'
import { SignIn } from './components/SignIn'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
      errorElement: <MissingContent />,
      children: [
        { index: true, element: <div>Home</div> },
        {
          path: 'map',
          element: <MapContainer />
        }
      ]
    },
    {
      path: '/sign-in',
      element: <SignIn />
    },
    {
      path: '/sign-up',
      element: <SignUp />
    }
  ])

  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
    </>
  )
}

App.displayName = 'App'

export default App
