import axios from "axios";
import { useAuthStore } from "@stores/useAuth";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const axiosInstance = axios.create({
	baseURL: SERVER_URL,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
		"Accept": "application/json"
	}
});

axiosInstance.interceptors.request.use(
	(config) => {
		const token = useAuthStore.getState().token;
		if (token) {
			config.headers["Authorization"] = token;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

export default axiosInstance;
