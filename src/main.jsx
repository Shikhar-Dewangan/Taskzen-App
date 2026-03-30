import React from 'react'
import { createRoot, ReactDOM } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.jsx'
import './index.css';
import { store } from './Store/store.js'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './Components/Router.jsx'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Signup from './Pages/Signup.jsx'
import Dashboard from './Pages/DashBoread.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [

        {
        path: "/",
        element: (
            <Home />
        
        )
      },

      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        )
      },

        {
            path: "/login",
            element: (
                <ProtectedRoute authentication={false}>
                    <Login />
                </ProtectedRoute>
            ),
        },

     {
            path: "/signup",
            element: (
                <ProtectedRoute authentication={false}>
                    <Signup />
                </ProtectedRoute>
            ),
        },

    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
