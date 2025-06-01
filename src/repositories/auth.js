import axiosInstance from "../plugins/axios.js";

export function AuthRepository() {
	async function login(data) {
		const response = await axiosInstance.post(`/auth/login`, data);

		return response.data;
	}

	async function register(data) {
		const response = await axiosInstance.post(`/auth/register`, data);
		return response.data;
	}

	async function insertPhone(data) {
		const response = await axiosInstance.post(`/user/insert-phone`, data);
		return response.data;
	}

	async function confirmPhone(data) {
		const response = await axiosInstance.post(`/user/confirm-phone`, data);
		return response.data;
	}

	async function resendCode() {
		const response = await axiosInstance.post(`/user/resend-code`);
		return response;
	}

	async function fetchUserData() {
		const response = await axiosInstance.get('/user/user-details');
		return response.data;
	}

	return {
		login,
		confirmPhone,
		resendCode,
		fetchUserData,
		insertPhone,
		register
	};
}
