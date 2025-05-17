import React, { useState } from "react";
import { AuthRepository } from "@repositories/auth";

export function createAuthController() {
	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState("null");
	
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
			const userData = await authRepository.register(data);
			setStatus("success")
			return userData;
		} catch(e) {
			setStatus("failed")
			console.error(e)
		} finally {
			setLoading(false);
		}
	}

	return {
		login,
		status,
		register,
		loading,
	};
}
