import axiosInstance from "../plugins/axios.js";

export function GameRepository() {
	async function getTermData() {
		const response = await axiosInstance.get('/game/term/');
		return response.data;
	}

	async function termGuess(data) {
		const response = await axiosInstance.post('/game/term/guess', JSON.stringify(data));
		return response.data;
	}

	async function getQuizData() {
		const response = await axiosInstance.get('/game/quiz/');
		return response.data;
	}

	async function quizGuess(data) {
		const response = await axiosInstance.post('/game/quiz/guess', JSON.stringify(data));
		return response.data;
	}

	return {
		getTermData,
		termGuess,
		getQuizData,
		quizGuess
	};
}
