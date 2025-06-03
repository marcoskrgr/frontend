import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@stores/useAuth";

export default function PublicRoute() {
	const userData = useAuthStore((state) => state.userData);

	if (userData?.fgEmailVerified === 2) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
}
