import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "@stores/useAuth"

export default function ProtectedRoute() {
  const token = useAuthStore((state) => state.token)
  const userData = useAuthStore((state) => state.userData)

  console.log(userData)

  if (!token || !userData) return <Navigate to="/register" replace />
  if (userData && userData.fgPhoneVerified !== 3) return <Navigate to="/confirm-phone" replace />

  return <Outlet />
}
