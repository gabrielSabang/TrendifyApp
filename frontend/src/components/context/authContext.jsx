import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [isLogIn, setIsLogIn] = useState(false)
  const [user, setUser] = useState(null);

  useEffect(() => {
    authenticate();
  }, []);

  const authenticate = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/Trendify/user', { withCredentials: true });
      setIsLogIn(true);
      setUser(res.data);
    } catch (error) {
      console.error("Authentication error:", error);
      setIsLogIn(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isLogIn, setIsLogIn, authenticate, user, setUser, loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
