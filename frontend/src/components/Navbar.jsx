import React, { useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { AuthContext } from './context/authContext'

const Navbar = () => {
  const navigate = useNavigate()
  const {isLogIn, setIsLogIn, setUser} = useContext(AuthContext);

  const handleLogout = async () => {
  try {
    await axios.post(
      'http://localhost:5000/Trendify/user/logout',
      {},
      { withCredentials: true }
    )

    setIsLogIn(false)
    setUser(null);
    navigate('/')
  } catch (err) {
    console.error(err)
  }
}

  return (
    <nav className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link to="/">
          <h1 className="text-2xl font-extrabold tracking-wide">
            Trendify
          </h1>
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/"
            className="hover:text-gray-200 transition-colors">
            Home
          </Link>

          {isLogIn && (
            <>
              <Link
                to="/user/shop"
                className="hover:text-gray-200 transition-colors">
                Shop
              </Link>

              <Link
                to="/user/sell"
                className="hover:text-gray-200 transition-colors">
                Sell
              </Link>

              <Link
                to="/user/cart"
                className="hover:text-gray-200 transition-colors">
                Cart
              </Link>

              <Link
                to="/user/profile"
                className="hover:text-gray-200 transition-colors">
                Profile
              </Link>
            </>
          )}

          {!isLogIn && (
            <>
              <Link
                to="/login"
                className="hover:text-gray-200 transition-colors">
                Login
              </Link>

              <Link
                to="/register"
                className="bg-white text-indigo-600 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition">
                Sign Up
              </Link>
            </>
          )}

          {isLogIn && (
            <button
              onClick={handleLogout}
              className="bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
