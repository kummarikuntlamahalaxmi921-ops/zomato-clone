import {useEffect, useState} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import RestaurantDetails from './components/RestaurantDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import Profile from './components/Profile'
import './App.css'

const ProtectedRoute = ({children}) =>
  localStorage.getItem('jwt_token') ? children : <Navigate to="/login" replace />

const App = () => {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cartData')) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('cartData', JSON.stringify(cart))
  }, [cart])

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home cart={cart} setCart={setCart} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/restaurant/:id"
        element={
          <ProtectedRoute>
            <RestaurantDetails cart={cart} setCart={setCart} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart cart={cart} setCart={setCart} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile cart={cart} />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
