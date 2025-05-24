import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const getToken = () => {
	return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjliOGY2NWZiLWJlMWMtNDQwMS1iNTdlLWQ4Yjg3Y2JmNWI0YyIsImZnUGhvbmVWZXJpZmllZCI6MywiZmlyc3ROYW1lIjoiZ3VnYSIsImxhc3ROYW1lIjoidHJlbnRzIiwiaWF0IjoxNzQ3NTExMjA3fQ.Z5ODkaEpH-7ujAJAaDq058fDvFJgsCyk3yJtns0z3CM'
}

export const axiosInstance = axios.create({
	baseURL: SERVER_URL,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
		Authorization: getToken()
	}
});

export const setToken = (token) => {
	if (token) {
		axiosInstance.defaults.headers.common['Authorization'] = token;
	} else {
		delete axiosInstance.defaults.headers.common['Authorization'];
	}
}

export default axiosInstance;