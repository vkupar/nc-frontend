import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './config/firebase'
import Authentication from './pages/Authentication'
import Profile from './pages/Profile'
import Loading from './components/Loading'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const [user, loading] = useAuthState(auth)
  if (loading) return <Loading />
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<Authentication />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
