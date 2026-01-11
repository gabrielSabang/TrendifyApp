import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext.jsx'


const Login = () => {
  const navigate = useNavigate()
  const { setIsLogIn, setUser } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const response = await fetch('http://localhost:5000/Trendify/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })
      let data;
      try {
        data = await response.json()
      } catch (err) {
        setError('Server error: invalid response')
        return
      }
      if (response.ok) {
        setIsLogIn(true);
        setUser(data.user);
        navigate('/user/shop') 
      } else {
        setError(data.message || 'Login failed')
      }
    } catch (err) {
      console.error(err)
      setError('Network error')
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="hidden md:flex flex-1"></div>

      <div className="flex w-full md:w-[420px] items-center justify-center bg-white shadow-lg">
        <form
          onSubmit={handleSubmit}
          className="w-full px-8 py-10 flex flex-col gap-4"
        >
          <h2 className="text-2xl font-semibold text-center">Login</h2>

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded"
            required
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded"
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>

          <p className="text-sm text-center">
            Don’t have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-blue-500 hover:underline"
            >
              Register
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
