import React from 'react'

import answerImage from "@assets/answer.png";
import answerCorrectImage from "@assets/answerCorrect.png";
import answerIncorrectImage from "@assets/answerIncorrect.png";

import style from './style.module.css'

function Help() {
  return (
    <>
      <p>
        Este desafio foi criado para testar e ampliar seus conhecimentos sobre a empresa que é referência global em soluções para gestão da excelência e conformidade corporativa. 🌍
      </p>
      <p className={style.sectionSpacing}>
        Durante o quiz, você encontrará perguntas sobre:
      </p>
      <ul>
        <li>📜 A história da SoftExpert</li>
        <li>🛠️ Seus produtos e soluções</li>
        <li>🌐 Presença internacional e clientes</li>
        <li>💙 Cultura e valores da empresa</li>
        <li>🚀 Inovações e certificações</li>
      </ul>
      <p>
        💡 Seja você um colaborador, parceiro ou apenas curioso, este quiz é uma ótima forma de aprender mais sobre a organização e mostrar o quanto você conhece!
      </p>

      <p className={style.sectionSpacing}><strong>Como jogar?</strong></p>
      <ol>
        <li>📝 Uma pergunta será apresentada com 4 alternativas.</li>
        <li>🎯 Escolha a alternativa que considerar correta.</li>
      </ol>
      <img src={answerImage} className={style.image} alt="Exemplo de pergunta" />
      <ol>
        <li>🔍 Após escolher, você verá se acertou ou errou.</li>
      </ol>
      <div className={style.answerImages}>
        <img src={answerCorrectImage} className={style.imageHalf} alt="Resposta correta" />
        <img src={answerIncorrectImage} className={style.imageHalf} alt="Resposta incorreta" />
      </div>
      <p >
        🏁 O jogo termina quando todas as perguntas forem respondidas. Boa sorte!
      </p>
    </>
  )
}

export default Help