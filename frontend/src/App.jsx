import { Routes, Route } from 'react-router-dom'

import HomePage from './components/HomePage'
import Login from './components/userLog/Login'
import Register from './components/userLog/Register'
import Navbar from './components/Navbar'
import UserShopPage from './components/userPages/UserShopPage'
import UserSellingPage from './components/userPages/UserSellingPage'
import Cart from './components/cart/Cart'
import UserProfile from './components/userPages/UserProfile'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/shop" element={<ProtectedRoute><UserShopPage /></ProtectedRoute>} />
        <Route path="/user/sell" element={<ProtectedRoute><UserSellingPage /></ProtectedRoute>} />
        <Route path="/user/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/user/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default App
