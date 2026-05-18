import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthed } = useAuth()

  if (!isAuthed) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
