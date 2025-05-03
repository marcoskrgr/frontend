import { useState, useEffect } from "react";
import classNames from "classnames";
import styles from "./style.module.css";
import Vector from "../../assets/vector.svg";

export const QuizScreen = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
  const seconds = String(timer % 60).padStart(2, "0");

const questions = [
  {
    question: "Qual é a função do atributo alt na tag <img> em HTML?",
    answers: [
      { text: "Alinhar a imagem ao texto", isCorrect: false },
      { text: "Melhorar o SEO do site", isCorrect: false },
      { text: "Descrever o conteúdo da imagem para leitores de tela", isCorrect: true },
      { text: "Definir o tamanho da imagem", isCorrect: false },
    ],
  },
  {
    question: "Qual a diferença principal entre class e id no CSS?",
    answers: [
      { text: "class permite estilizar apenas um elemento; id pode ser usado em vários elementos", isCorrect: false },
      { text: "class é utilizado apenas em JavaScript; id apenas em CSS", isCorrect: false },
      { text: "class pode ser reutilizada em vários elementos; id deve ser único na página", isCorrect: true },
      { text: "class tem prioridade maior que id", isCorrect: false },
    ],
  },
  {
    question: "O que faz a propriedade CSS flex-wrap no Flexbox?",
    answers: [
      { text: "Define a direção dos itens flexíveis", isCorrect: false },
      { text: "Controla se os itens flexíveis podem quebrar em várias linhas", isCorrect: true },
      { text: "Ajusta automaticamente a largura dos itens para caber no contêiner", isCorrect: false },
      { text: "Alinha verticalmente os itens no contêiner", isCorrect: false },
    ],
  },
  {
    question: "Qual é o resultado de typeof NaN em JavaScript?",
    answers: [
      { text: "\"undefined\"", isCorrect: false },
      { text: "\"object\"", isCorrect: false },
      { text: "\"number\"", isCorrect: true },
      { text: "\"NaN\"", isCorrect: false },
    ],
  },
  {
    question: "O que o método Array.prototype.map() faz em JavaScript?",
    answers: [
      { text: "Altera o array original aplicando uma função a cada elemento", isCorrect: false },
      { text: "Filtra elementos que satisfazem uma condição", isCorrect: false },
      { text: "Ordena os elementos do array", isCorrect: false },
      { text: "Cria um novo array com o resultado de uma função aplicada a cada elemento", isCorrect: true },
    ],
  },
  {
    question: "Para que serve o hook useEffect no React?",
    answers: [
      { text: "Gerenciar estado em componentes de classe", isCorrect: false },
      { text: "Executar efeitos colaterais (fetch de dados, timers, manipulação do DOM) após a renderização", isCorrect: true },
      { text: "Criar referências a elementos DOM", isCorrect: false },
      { text: "Renderizar listas de forma otimizada", isCorrect: false },
    ],
  },
  {
    question: "Qual a principal diferença no escopo entre var e let em JavaScript?",
    answers: [
      { text: "var é block-scoped; let é function-scoped", isCorrect: false },
      { text: "var é function-scoped (ou global); let é block-scoped", isCorrect: true },
      { text: "var não pode ser reatribuída; let pode", isCorrect: false },
      { text: "Não há diferença de escopo, apenas de hoisting", isCorrect: false },
    ],
  },
  {
    question: "O que acontece quando um formulário HTML dispara o evento submit?",
    answers: [
      { text: "Dispara imediatamente o envio sem validação", isCorrect: false },
      { text: "Aciona o evento submit no próprio <form> antes de qualquer submissão efetiva, podendo ser interceptado", isCorrect: true },
      { text: "Executa sempre o método form.submit() do DOM", isCorrect: false },
      { text: "Somente valida o formulário, sem disparar evento", isCorrect: false },
    ],
  },
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
      setCurrentQuestion(0);
      setScore(0);
      setTimer(0);
    }
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const getButtonClass = (answer, index) => {
    if (!showFeedback) {
      return classNames(styles["answer-button"], styles["gradient-border"]);
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
          <img src={Vector} alt="Score Icon" className={styles["score-icon"]} />
          <span className={styles["score-text"]}>{score}</span>
        </div>
        <div className={styles["task-text"]}>
          TASK {currentQuestion + 1} - {questions.length}
        </div>
        <div className={styles["timer-text"]}> {minutes}:{seconds}</div>
      </header>

      <main className={styles["quiz-main"]}>
        <h1 className={styles["quiz-question"]}>{questionObj.question}</h1>
        <div className={styles["quiz-line"]}></div>

        <div className={styles["answers-container"]}>
          {questionObj.answers.map((ans, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswerClick(idx)}
              disabled={showFeedback}
              className={getButtonClass(ans, idx)}
            >
              <p>
                {ans.text}
              </p>
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
