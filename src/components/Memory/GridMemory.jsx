import React, { useEffect, useState, useRef } from "react";
import Hexagon from "./HexagonMemory";
import styles from "./style.module.css";

import {GameRepository} from "../../repositories/games.js";

function GridMemory() {
  const [cards, setCards] = useState([]);
  const selectedRef = useRef([]);
  const [attempts, setAttempts] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const { getMemoryData, memoryGuess } = GameRepository();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMemoryData();

      const shuffled = response.cards.sort(() => 0.5 - Math.random()).slice(0, 18);
      setCards(shuffled);
      setAttempts(response.guesses)

      console.log(response)
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.guessed)) {
      setGameFinished(true);
    }
  }, [cards]);

  const handleGuess = async(cardId, pairId) => {
    if (selectedRef.current.length === 2) {
      const [first, second] = selectedRef.current;

      const checkGuess = await memoryGuess({ cardId: cards[first].id, pairId: cards[second].id })

      setTimeout(() => {
        setCards((prevCards) => {
          const updatedCards = [...prevCards];

          if (checkGuess) {
            updatedCards[first].guessed = true;
            updatedCards[second].guessed = true;
          } else {
            updatedCards[first].flipped = false;
            updatedCards[second].flipped = false;
          }
          return updatedCards;
        });

        setAttempts((prev) => prev + 1);
        selectedRef.current = [];
      }, 1000);
    }
  }

  const handleClick = (index) => {
    if (cards[index].flipped || cards[index].matched || selectedRef.current.length === 2) return;

    const updatedCards = [...cards];
    updatedCards[index].flipped = true;
    setCards(updatedCards);
    // setSelected((prev) => [...prev, index]);
    selectedRef.current = [...selectedRef.current, index];
    handleGuess()
  };

  const renderRows = () => {
    const rows = [];
    for (let i = 0; i < 18; i += 7) {
      const firstRow = cards.slice(i, i + 4);
      rows.push(
        <div key={`row-${i}`} className={styles["row-of-4"]}>
          {firstRow.map((card, idx) => (
            <Hexagon
              key={card.id}
              size={100}
              srcBack={card.image}
              flipped={card.flipped || card.guessed}
              stage={card.guessed ? 3 : 2}
              onClick={() => handleClick(i + idx)}
            />
          ))}
        </div>
      );

      const secondRow = cards.slice(i + 4, i + 7);
      if (secondRow.length > 0) {
        rows.push(
          <div key={`row-${i + 4}`} className={styles["row-of-3"]}>
            {secondRow.map((card, idx) => (
              <Hexagon
                key={card.id}
                size={100}
                srcBack={card.image}
                flipped={card.flipped || card.guessed}
                stage={card.guessed ? 3 : 2}
                onClick={() => handleClick(i + 4 + idx)}
              />
            ))}
          </div>
        );
      }
    }
    return rows;
  };

  return (
    <div>
      {gameFinished ? (
        <>
          <p className={styles["match"]}>VOCÊ FINALIZOU EM {attempts} TENTATIVAS!</p>
        </>
      ) : (
        <p className={styles["match"]}>ESCOLHA 2 POSIÇÕES!</p>
      )}
      <div className={styles["grid-container"]}>
        {renderRows()}
      </div>
    </div>
  );
}

export default GridMemory;
