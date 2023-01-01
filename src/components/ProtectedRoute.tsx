import { useAuthState } from 'react-firebase-hooks/auth'
import { Navigate } from 'react-router-dom'
import { auth } from '../config/firebase'
import Loading from './Loading'

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [user, loading] = useAuthState(auth)

  if (loading) {
    return <Loading />
  }

  if (!loading && !user) {
    return <Navigate to="/login" />
  }

  return children
}
export default ProtectedRoute
