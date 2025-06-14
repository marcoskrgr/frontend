import {useState} from "react";

import {useAuthStore} from "@stores/useAuth";
import {AuthRepository} from "@repositories/auth";
import {useToast} from "@components/common/Toast/ToastProvider";
import {jwtDecode} from "jwt-decode";

export function createAuthController() {
	const [loading, setLoading] = useState(false);
	const authRepository = AuthRepository();
	const { addToast } = useToast();

	const setToken = useAuthStore((state) => state.setToken);
	const getToken = useAuthStore((state) => state.token);
	const setUserData = useAuthStore((state) => state.setUserData);

	async function login(data) {
		try {
			setLoading(true);
			const response = await authRepository.login(data);
			setToken(response.token);
			setUserData(jwtDecode(response.token));
			return jwtDecode(response.token);
		} catch (e) {
			console.error("Original error at login: ", e);
			const error = getErrorMessage(e);
			addToast(error);
		} finally {
			setLoading(false);
		}
	}

	async function register(data) {
		try {
			setLoading(true);
			const response = await authRepository.register(data);
			setToken(response.token);
			setUserData(jwtDecode(response.token));
			return true;
		} catch (e) {
			console.error("Original error at register: ", e);
			const error = getErrorMessage(e);
			addToast(error);
		} finally {
			setLoading(false);
		}
	}

	async function confirmEmail(data) {
		try {
			setLoading(true);
			const response = await authRepository.confirmEmail(data, getToken);
			setToken(response.token);
			setUserData(jwtDecode(response.token));
			return true;
		} catch (e) {
			console.error("Original error at confirmEmail: ", e);
			const error = getErrorMessage(e);
			addToast(error);
		} finally {
			setLoading(false);
		}
	}

	async function resendCode() {
		try {
			setLoading(true);
			await authRepository.resendCode();
			return true;
		} catch (e) {
			console.error("Original error at resendCode: ", e);
			const error = getErrorMessage(e);
			addToast(error);
		} finally {
			setLoading(false);
		}
	}

	async function fetchUserData() {
		try {
			setLoading(true);
			const response = await authRepository.fetchUserData();
			setUserData(response);
		} catch (e) {
			console.error("Original error at fetchUserData: ", e);
			const error = getErrorMessage(e);
			addToast(error);
		} finally {
			setLoading(false);
		}
	}

	function getErrorMessage(error) {
		if (error?.response?.data?.message) {
			return error.response.data.message;
		}

		if (typeof error?.response?.data === 'string') {
			return error.response.data;
		}

		if (error?.message) {
			return error.message;
		}

		return "Ocorreu um erro desconhecido. Por favor, tente novamente.";
	}

	return {
		login,
		register,
		confirmEmail,
		fetchUserData,
		resendCode,
		loading
	};
}
