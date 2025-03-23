import React from "react";
import classNames from "classnames";

import Tag from "./Tag";

import styles from "./style.module.css";

function Card({title, description, difficulty, tags = [], profile}) {
	const cardClasses = classNames(styles["card"], {
		[styles["easy"]]: difficulty === "easy",
		[styles["medium"]]: difficulty === "medium",
		[styles["hard"]]: difficulty === "hard"
	});

	return (
		<div className={cardClasses}>
			<div className={styles["content"]}>
				<h2>{title}</h2>
				<p>{description}</p>
				<div className={styles["tags"]}>
					{tags.map((tag) => (
						<Tag key={tag.label} label={tag.label} />
					))}
				</div>
			</div>
			<div className={styles["profile"]}></div>
		</div>
	);
}

export default Card;
