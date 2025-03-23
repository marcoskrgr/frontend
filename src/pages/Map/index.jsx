import React, { useEffect, useRef } from "react";

import Card from "../../components/Map/Card";
import Column from "../../components/Map/Column";
import PlayerProfile from "../../components/Map/PlayerProfile";
import { useUser } from "../../helpers/context/UserContext";

import styles from "./style.module.css";

function Map() {
  const { name, tickets, level } = useUser();

  const contentRef = useRef(null);
  const lastCardRef = useRef(null);

  const cards = [
    { id: 4, title: "Task #4", difficulty: "hard", tags: [{ label: "BUG", color: "red" }], description: "Resolver bugs do sistema" },
    { id: 3, title: "Task #3", difficulty: "medium", tags: [{ label: "TASK", color: "blue" }], description: "Escrever documentação" },
    { id: 2, title: "Task #2", difficulty: "easy", tags: [{ label: "REFACTOR", color: "yellow" }], description: "Pair programming com o scrum" },
    { id: 1, title: "Task #1", difficulty: "easy", description: "Responder o quiz de treinamento" }
  ];

  const columns = [
    { id: 4, title: "Backlog" },
    { id: 3, title: "To-do" },
    { id: 2, title: "In progress" },
    { id: 1, title: "Done" }
  ];

  const getColumnCards = (columnTitle) => {
    return cards.filter((card) => {
      if (columnTitle === "In progress") return card.id === level;
      if (columnTitle === "Done") return card.id < level;
      if (columnTitle === "To-do") return card.id === level + 1;
      if (columnTitle === "Backlog") return card.id > level + 1;
      return false;
    });
  };

  const visibleColumns = columns.filter((column) => getColumnCards(column.title).length > 0);

  useEffect(() => {
    if (lastCardRef.current) {
      lastCardRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, []);

  return (
    <div ref={contentRef} className={styles["content"]}>
      <PlayerProfile />
      {visibleColumns.map((column) => {
        const columnCards = getColumnCards(column.title);
        return (
          <Column key={column.id} title={column.title} length={columnCards.length}>
            {columnCards.map((card, index) => (
              <Card
                difficulty={card.difficulty}
                key={card.title}
                {...card}
                ref={index === cards.length - 1 ? lastCardRef : null}
              />
            ))}
          </Column>
        );
      })}
    </div>
  );
}

export default Map;
