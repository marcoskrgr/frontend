import {useState, useEffect, useRef} from "react";
import classNames from "classnames";

import Help from "@components/Quiz/Help";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import GameHeader from "@components/common/GameHeader";
import Loading from "@components/common/Button/Loading";
import AnswerButton from "@components/Quiz/AnswerButton";
import FinishModal from "@components/common/FinishModal";
import {GameRepository} from "../../repositories/games";

import styles from "./style.module.css";

const NpsInput = ({type, value, onChange, onSubmit, isLoading}) => {
	const isNumberInvalid = type === "number" && (value < 1 || value > 10);
	const isTextInvalid = type !== "number" && (!value || value.trim().length === 0);
	const isDisabled = isNumberInvalid || isTextInvalid || isLoading;

	return (
		<div className={styles["nps-input-wrapper"]}>
			<Input
				id="nps-input"
				type={type}
				showButton={type === "number"}
				min={1}
				max={type === "number" ? 10 : undefined}
				error={type === "number" && isNumberInvalid ? "Valor deve ser entre 1 e 10" : null}
				value={value}
				onChange={(valOrEvent) => {
					const newVal = typeof valOrEvent === "object" ? valOrEvent.target.value : valOrEvent;
					onChange(type === "number" ? Number(newVal) : newVal);
				}}
			/>
			<Button
				isDisabled={isDisabled || isLoading}
				onClick={isDisabled ? () => {} : onSubmit}
				text={isLoading ? "Enviando..." : type === "number" ? "Próxima" : "Finalizar"}
				customStyle={{flex: "1"}}
				type="primary"
				size="medium"
			/>
		</div>
	);
};

export const Quiz = () => {
	const [questions, setQuestions] = useState([]);
	const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [showFeedback, setShowFeedback] = useState(false);
	const [ended, setEnded] = useState(false);
	const [isHelpOpen, setIsHelpOpen] = useState(false);
	const [npsResponse, setNpsResponse] = useState("");
	const [timer, setTimer] = useState(0);
	const correctAnswer = useRef(null);
	const [isSubmittingNps, setIsSubmittingNps] = useState(false);
	const {getQuizData, quizGuess} = GameRepository();

	useEffect(() => {
		const fetchData = async () => {
			const response = await getQuizData();
			setQuestions(response.questions);
			setCurrentQuestionIdx(response.currentQuestion);
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (ended || isHelpOpen) return;

		const interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
		return () => clearInterval(interval);
	}, [ended, isHelpOpen]);

	const currentQuestion = questions[currentQuestionIdx];

	const handleAnswerClick = async (index) => {
		if (showFeedback) return;

		setSelectedAnswer(index);
		const chosen = currentQuestion.answers[index];
		correctAnswer.current = await quizGuess({answer: chosen.id});

		setShowFeedback(true);
		setTimeout(() => handleNextQuestion(), 1500);
	};

	const handleNpsAnswer = async () => {
		setIsSubmittingNps(true);
		try {
			await quizGuess({answer: npsResponse});
			handleNextQuestion();
		} finally {
			setIsSubmittingNps(false);
		}
	};

	const handleNextQuestion = () => {
		const next = currentQuestionIdx + 1;
		if (next < questions.length) {
			setCurrentQuestionIdx(next);
		} else {
			setEnded(true);
		}
		setSelectedAnswer(null);
		setShowFeedback(false);
		setNpsResponse("");
	};

	const getButtonClass = (answer, index) => {
		const baseClass = styles["answer-button"];
		if (!showFeedback) {
			return classNames(baseClass, styles["gradient-border"], styles["answer-button-normal"]);
		}
		if (index === selectedAnswer) {
			return classNames(
				baseClass,
				answer.id === correctAnswer.current ? styles["answer-selected-correct"] : styles["answer-selected-incorrect"]
			);
		}
		return classNames(baseClass, answer.id === correctAnswer.current ? styles["answer-correct"] : styles["answer-incorrect"]);
	};

	useEffect(() => {
		if (currentQuestion?.npsQuestion && currentQuestion?.npsType === "number") {
			setNpsResponse(10);
		}
	}, [currentQuestion]);

	const renderAnswers = () => {
		if (!currentQuestion) return null;

		if (currentQuestion.npsQuestion) {
			return (
				<NpsInput
					type={currentQuestion.npsType === "text" ? "long_text" : currentQuestion.npsType}
					value={npsResponse}
					onChange={setNpsResponse}
					onSubmit={handleNpsAnswer}
					isLoading={isSubmittingNps}
				/>
			);
		}

		return currentQuestion.answers.map((ans, idx) => (
			<AnswerButton
				key={ans.id}
				answer={ans}
				index={idx}
				onClick={() => handleAnswerClick(idx)}
				disabled={showFeedback}
				className={getButtonClass(ans, idx)}
			/>
		));
	};

	if (!currentQuestion) return <Loading />;

	return (
		<>
			<div className={styles["container"]}>
				<GameHeader task="Task #1" timer={timer} ContentHelp={Help} isHelpOpen={isHelpOpen} setIsHelpOpen={setIsHelpOpen} />
				<div className={styles["content"]}>
					<div className={styles["header"]}>
						<span className={styles["question-index"]}>
							Questão {currentQuestionIdx + 1} de {questions.length}
						</span>
						<h1 className={styles["question"]}>{currentQuestion.npsQuestion ? "Queremos saber sua opinião!" : currentQuestion.text}</h1>
						{currentQuestion.npsQuestion && <p className={styles["sub-question"]}>{currentQuestion.text}</p>}
					</div>
					<div className={styles["answers-container"]}>{renderAnswers()}</div>
				</div>
			</div>
			<FinishModal time={timer} showModal={ended} />
		</>
	);
};

export default Quiz;
