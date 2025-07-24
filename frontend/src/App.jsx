import './App.css'
import Body from './components/Body'
import Login from './components/Login'
import Signup from './components/Signup'
import Notfound from './components/Notfound'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import {GoogleOAuthProvider} from '@react-oauth/google'

function App() {
  const AuthProvider = () => {
    return (
    <GoogleOAuthProvider clientId='837309494209-534k4hjs9jugbcp8046gjutbhmqe6qbf.apps.googleusercontent.com'>
      <Login/>
    </GoogleOAuthProvider>
    )
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Body/>, 

    },
    {
      path: "/login",
      element: <AuthProvider/>,
    },
    {
      path: "/signup",
      element: <Signup/>,
    },
    {
      path: "*",
      element: <Notfound/>,
    }
  ])
  return (
    <>
   <RouterProvider router={router} />
    </>
  )
}

export default App
