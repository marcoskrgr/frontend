import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "@stores/useAuth"

export default function ProtectedRoute() {
  const token = useAuthStore((state) => state.token)
  const isPhoneConfirmed = useAuthStore((state) => state.isPhoneConfirmed)

  if (!token) return <Navigate to="/register" replace />
  if (!isPhoneConfirmed) return <Navigate to="/confirm-phone" replace />

  return <Outlet />
}
