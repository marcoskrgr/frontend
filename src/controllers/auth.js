import React, {useState} from "react";
import {AuthRepository} from "@repositories/auth";
import {useUser} from "@helpers/context/UserContext";

export function createAuthController() {
	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState("null");
	const {token, setToken} = useUser();

	const authRepository = AuthRepository();

	async function login(data) {
		try {
			setLoading(true);
			const userData = await authRepository.login(data);
			return userData;
		} finally {
			setLoading(false);
		}
	}

	async function register(data) {
		try {
			setLoading(true);
			const response = await authRepository.register(data);
			setToken(response.token);
/* 			return response; */
		} catch (e) {
			setStatus("failed");
			console.error(e);
		} finally {
			setLoading(false);
		}
	}

	async function insertPhone(data) {
		try {
			setLoading(true);
			const response = await authRepository.insertPhone(data, token);
			setStatus("success");
			return response;
		} catch (e) {
			setStatus("failed");
			console.error(e);
		} finally {
			setLoading(false);
		}
	}

	return {
		login,
		status,
		register,
		insertPhone,
		loading
	};
}
