import React, {useEffect, useRef} from "react";
import {Link} from "react-router-dom";

import Card from "@components/Map/Card";
import Column from "@components/Map/Column";
import {useUser} from "../../helpers/context/UserContext";
import PlayerProfile from "@components/Map/PlayerProfile";

import styles from "./style.module.css";

const columns = [
	{id: 4, title: "Backlog"},
	{id: 3, title: "To-do"},
	{id: 2, title: "In progress"},
	{id: 1, title: "Done"}
];

const cards = [
	{id: 4, title: "Task #4", route: "/", difficulty: "hard", tags: [{label: "BUG", color: "red"}], description: "Resolver bugs do sistema"},
	{
		id: 3,
		title: "Task #3",
		route: "/wordle",
		difficulty: "medium",
		tags: [{label: "TASK", color: "blue"}],
		description: "Escrever documentação"
	},
	{
		id: 2,
		title: "Task #2",
		route: "/memory",
		difficulty: "easy",
		tags: [{label: "REFACTOR", color: "yellow"}],
		description: "Pair programming com o scrum"
	},
	{id: 1, title: "Task #1", route: "/quiz", difficulty: "easy", description: "Responder o quiz de treinamento"}
];

function Map() {
	const {name, tickets, level} = useUser();

	const contentRef = useRef(null);
	const lastCardRef = useRef(null);

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
			lastCardRef.current.scrollIntoView({behavior: "smooth", block: "end"});
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
							<Link key={card.title} to={card.route}>
								<Card difficulty={card.difficulty} {...card} ref={index === cards.length - 1 ? lastCardRef : null} />
							</Link>
						))}
					</Column>
				);
			})}
		</div>
	);
}

export default Map;
