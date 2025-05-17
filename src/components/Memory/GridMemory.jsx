import React, { useEffect, useState } from "react";
import Hexagon from "./HexagonMemory";
import styles from "./style.module.css";

import c_icon from "../../../src/assets/icons_memory/c_icon.png";
import css_icon from "../../../src/assets/icons_memory/css_icon.png";
import html_icon from "../../../src/assets/icons_memory/html_icon.png";
import js_icon from "../../../src/assets/icons_memory/js_icon.png";
import py_icon from "../../../src/assets/icons_memory/py_icon.png";
import r_icon from "../../../src/assets/icons_memory/r_icon.png";
import php_icon from "../../../src/assets/icons_memory/php_icon.png";
import delphi_icon from "../../../src/assets/icons_memory/delphi_icon.png";
import java_icon from "../../../src/assets/icons_memory/java_icon.png";

const iconList = [
  { src: c_icon, alt: "C" },
  { src: css_icon, alt: "CSS" },
  { src: html_icon, alt: "HTML" },
  { src: js_icon, alt: "JavaScript" },
  { src: py_icon, alt: "Python" },
  { src: r_icon, alt: "R" },
  { src: php_icon, alt: "PHP" },
  { src: delphi_icon, alt: "Delphi" },
  { src: java_icon, alt: "Java" },
];

function GridMemory() {
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);

   const initializeGame = () => {
    const duplicatedIcons = [...iconList, ...iconList].map((icon, index) => ({
      id: index,
      src: icon.src,
      alt: icon.alt,
      flipped: false,
      matched: false,
    }));

    const shuffled = duplicatedIcons.sort(() => 0.5 - Math.random()).slice(0, 18);
    setCards(shuffled);
    setAttempts(0);
    setGameFinished(false);
    setSelected([]);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (selected.length === 2) {
      const [first, second] = selected;
      setTimeout(() => {
        setCards((prevCards) => {
          const updatedCards = [...prevCards];
          if (updatedCards[first].alt === updatedCards[second].alt) {
            updatedCards[first].matched = true;
            updatedCards[second].matched = true;
          } else {
            updatedCards[first].flipped = false;
            updatedCards[second].flipped = false;
          }
          return updatedCards;
        });

        setAttempts((prev) => prev + 1);
        setSelected([]);
      }, 1000);
    }
  }, [selected]);

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setGameFinished(true);
    }
  }, [cards]);

  const handleClick = (index) => {
    if (cards[index].flipped || cards[index].matched || selected.length === 2) return;

    const updatedCards = [...cards];
    updatedCards[index].flipped = true;
    setCards(updatedCards);
    setSelected((prev) => [...prev, index]);
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
              srcBack={card.src}
              flipped={card.flipped || card.matched}
              stage={card.matched ? 3 : 2}
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
                srcBack={card.src}
                flipped={card.flipped || card.matched}
                stage={card.matched ? 3 : 2}
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
