import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from './context/authContext.jsx'

const ProtectedRoute = ({ children }) => {
  const { isLogIn } = useContext(AuthContext)

  if (!isLogIn) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute