import {AuthRepository} from "@repositories/auth";

export function createAuthController() {
	const authRepository = AuthRepository();

	let loading = false;

	async function login(data) {
		try {
			loading = true;
			const userData = await authRepository.login(data);
			return userData;
		} finally {
			loading = false;
		}
	}

	async function register(data) {
		try {
			loading = true;
			const userData = await authRepository.register(data);
			return userData;
		} finally {
			loading = false;
		}
	}

	return {
		login,
		register,
		loading
	};
}
