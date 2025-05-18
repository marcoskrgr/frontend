import axios from "axios";

const BASE_URL = "http://localhost:4000/auth";

export function AuthRepository() {
	async function login(data) {
		const response = await axios.post(`${BASE_URL}/login`, data, {
			withCredentials: true
		});

		return response.data;
	}

	async function register(data) {
		const response = await axios.post(`${BASE_URL}/register`, data);
		return response.data;
	}

	async function insertPhone(data, token) {
		const response = await axios.post(`${BASE_URL}/insert-phone`, data, {
			headers: {
				Authorization: token,
			},
		});
		return response;
	}

	return {
		login,
		insertPhone,
		register
	};
}
