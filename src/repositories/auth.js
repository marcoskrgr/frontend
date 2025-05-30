import axiosInstance from "../plugins/axios.js";

export function AuthRepository() {
	async function login(data) {
		const response = await axiosInstance.post(`/auth/login`, data, {
			withCredentials: true
		});

		return response.data;
	}

	async function register(data) {
		const response = await axiosInstance.post(`/auth/register`, data);
		return response.data;
	}

	async function insertPhone(data) {
		const response = await axiosInstance.post(`/auth/insert-phone`, data);
		return response;
	}

	async function confirmPhone(data) {
		const response = await axiosInstance.post(`/auth/confirm-phone`, data);
		return response;
	}

	async function resendCode() {
		const response = await axiosInstance.post(`/auth/resend-code`);
		return response;
	}

	return {
		login,
		confirmPhone,
		resendCode,
		insertPhone,
		register
	};
}
