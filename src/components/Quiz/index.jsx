import { Star } from "lucide-react";
import { useState } from "react";
import classNames from "classnames";
import styles from "./style.module.css";

export const QuizScreen = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      question: "PERGUNTA 1: PERGUNTA REALMENTE MUITO COMPLICADA COM 4 RESPOSTAS",
      answers: [
        { text: "RESPOSTA 1", isCorrect: false },
        { text: "RESPOSTA 2", isCorrect: false },
        { text: "RESPOSTA 3", isCorrect: false },
        { text: "RESPOSTA 4", isCorrect: true },
      ],
    },
    {
      question: "PERGUNTA 2: OUTRA PERGUNTA COM 4 RESPOSTAS",
      answers: [
        { text: "RESPOSTA A", isCorrect: false },
        { text: "RESPOSTA B", isCorrect: false },
        { text: "RESPOSTA C", isCorrect: false },
        { text: "RESPOSTA D", isCorrect: true },
      ],
    },
    {
      question: "PERGUNTA 3: MAIS UMA PERGUNTA PARA TESTE",
      answers: [
        { text: "OPÇÃO 1", isCorrect: false },
        { text: "OPÇÃO 2", isCorrect: false },
        { text: "OPÇÃO 3", isCorrect: false },
        { text: "OPÇÃO 4", isCorrect: true },
      ],
    },
    // mais perguntas perguntas aqui kk
  ];

  const handleAnswerClick = (index) => {
    if (showFeedback) return; 
    setSelectedAnswer(index);
    setShowFeedback(true);

    const chosen = questions[currentQuestion].answers[index];
    if (chosen.isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {

    const next = currentQuestion + 1;
    if (next < questions.length) {
      setCurrentQuestion(next);
    } else {
      // opcional: reiniciar do início ou mostrar resultado paia
      setCurrentQuestion(0);
      setScore(0);
    }
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const getButtonClass = (answer, index) => {
    if (!showFeedback) {
      return styles["answer-button"];
    }
    if (index === selectedAnswer) {
      return classNames(
        styles["answer-button"],
        answer.isCorrect
          ? styles["answer-selected-correct"]
          : styles["answer-selected-incorrect"]
      );
    }
    if (answer.isCorrect) {
      return classNames(styles["answer-button"], styles["answer-correct"]);
    }
    return classNames(styles["answer-button"], styles["answer-incorrect"]);
  };

  const questionObj = questions[currentQuestion];

  return (
    <div className={styles["quiz-container"]}>
      <header className={styles["quiz-header"]}>
        <div className={styles["score-container"]}>
          <Star className={styles["score-icon"]} />
          <span className={styles["score-text"]}>{score}</span>
        </div>
        <div className={styles["task-text"]}>
          TASK {currentQuestion + 1} - {questions.length}
        </div>
        <div className={styles["timer-text"]}>02:35</div>
      </header>

      <main className={styles["quiz-main"]}>
        <h1 className={styles["quiz-question"]}>{questionObj.question}</h1>

        <div className={styles["answers-container"]}>
          {questionObj.answers.map((ans, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswerClick(idx)}
              disabled={showFeedback}
              className={getButtonClass(ans, idx)}
            >
              {ans.text}
            </button>
          ))}
        </div>

        {showFeedback && (
          <button
            className={styles["next-button"]}
            onClick={handleNextQuestion}
          >
            Próxima pergunta
          </button>
        )}
      </main>
    </div>
  );
};

export default QuizScreen;
