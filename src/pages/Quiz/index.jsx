import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import classNames from "classnames";

import GameHeader from "@components/common/GameHeader";
import { GameRepository } from "../../repositories/games";
import Loading from "../../components/common/Button/Loading";
import FinishModal from "@components/common/FinishModal";

import styles from "./style.module.css";
import Help from "@components/Quiz/Help";

export const Quiz = () => {
	const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
	const [questions, setQuestions] = useState([]);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [ended, setEnded] = useState(false);
	const correctAnswer = useRef(null);
	const [showFeedback, setShowFeedback] = useState(false);
	const { getQuizData, quizGuess } = GameRepository();
	const [timer, setTimer] = useState(0);
	const [isHelpOpen, setIsHelpOpen] = useState(false);
	const [npsResponse, setNpsResponse] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			const response = await getQuizData();
			setCurrentQuestionIdx(response.currentQuestion);
			setQuestions(response.questions);
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (ended || isHelpOpen) return;

		const interval = setInterval(() => {
			setTimer((prev) => prev + 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [ended, isHelpOpen]);

	const handleAnswerClick = async (index) => {
		if (showFeedback) return;
		setSelectedAnswer(index);

		const chosen = questions[currentQuestionIdx].answers[index];
		correctAnswer.current = await quizGuess({ answer: chosen.id });

		setShowFeedback(true);

		setTimeout(() => {
			handleNextQuestion();
		}, 1500);
	};

	const handleNpsAnswer = async () => {
		await quizGuess({ answer: npsResponse });
		handleNextQuestion();
	}

	const handleNextQuestion = () => {
		const next = currentQuestionIdx + 1;
		if (next < questions.length) {
			setCurrentQuestionIdx(next);
		} else {
			setEnded(true);
		}
		setSelectedAnswer(null);
		setShowFeedback(false);
	};

	const getButtonClass = useCallback(
		(answer, index) => {
			if (!showFeedback) {
				return classNames(styles["answer-button"], styles["gradient-border"], styles["answer-button-normal"]);
			}

			if (index === selectedAnswer) {
				return classNames(
					styles["answer-button"],
					answer.id === correctAnswer.current ? styles["answer-selected-correct"] : styles["answer-selected-incorrect"]
				);
			}

			return classNames(
				styles["answer-button"],
				answer.id === correctAnswer.current ? styles["answer-correct"] : styles["answer-incorrect"]
			);
		},
		[showFeedback, selectedAnswer]
	);

	const currentQuestion = useMemo(() => questions[currentQuestionIdx], [questions, currentQuestionIdx]);

	const getNormalAnswersDisplay = useCallback( answers => answers.map((ans, idx) => (
			<button
				key={idx}
				onClick={() => handleAnswerClick(idx)}
				disabled={showFeedback}
				className={getButtonClass(ans, idx)}
			>
				<p>{ans.text}</p>
			</button>
	)),[handleAnswerClick, showFeedback, getButtonClass]);
	
	const getNPSAnswersDisplay = useCallback(currentQuestion => {

		const setNpsValue = (value) => {
			if (value < 0 || value > 10) {
				console.warn("NPS value must be between 0 and 10");
				return;
			}
			setNpsResponse(value);
		}

		if (currentQuestion.npsType === "number") {
			return (
				<>
					<p className={styles["question"]}>Valor selecionado: {npsResponse ? npsResponse : '0' }</p>
					<input
						type="number"
						value={npsResponse}
						max={10}
						min={0}
						onChange={e => setNpsValue(e.target.value)}
					/>
					<button
						className={classNames(styles["answer-button"], styles["gradient-border"], styles["answer-button-normal"])}
						onClick={handleNpsAnswer}
					>
						Responder
					</button>
				</>
			);
		}

		return (
			<>
				<p className={styles["question"]}>Deixe sua opnião:</p>
				<input
					type="text"
					value={npsResponse}
						onChange={e => setNpsValue(e.target.value)}
				/>
				<button
					className={classNames(styles["answer-button"], styles["gradient-border"], styles["answer-button-normal"])}
					onClick={handleNpsAnswer}
				>
					Responder
				</button>
			</>
		)

	},[npsResponse, setNpsResponse, handleNpsAnswer])

	const getAnswersDisplay = useCallback((currentQuestion) => {
		if (!currentQuestion.npsQuestion) {
			return getNormalAnswersDisplay(currentQuestion.answers);
		}
		
		return getNPSAnswersDisplay(currentQuestion);

	}, [getNPSAnswersDisplay, getNormalAnswersDisplay, currentQuestion]);

	if (!currentQuestion) return <Loading />;

	return (
		<>
			<div className={styles["container"]}>
				<GameHeader
					task="Task #1"
					timer={timer}
					ContentHelp={Help}
					isHelpOpen={isHelpOpen}
					setIsHelpOpen={setIsHelpOpen}
				/>
				<div className={styles["header"]}>
					<h1 className={styles["question"]}>{currentQuestion?.text}</h1>
					<div className={styles["line"]}></div>
				</div>
				<div className={styles["answers-container"]}>
					{getAnswersDisplay(currentQuestion)}
				</div>
			</div>
			<FinishModal time={timer} showModal={ended} />
		</>
	);
};

export default Quiz;
