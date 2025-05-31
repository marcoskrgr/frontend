import React, { useState } from "react";
import classNames from "classnames";

import Tag from "./Tag";
import styles from "./style.module.css";

function Card({ title, description, difficulty, onClick, tags = [], isToDo }) {
	const [isShaking, setIsShaking] = useState(false);

	const handleClick = () => {
		if (isToDo) {
			setIsShaking(true);
			setTimeout(() => setIsShaking(false), 400); // igual ao tempo do CSS
		} else {
			onClick?.();
		}
	};

	const cardClasses = classNames(styles["card"], {
		[styles["easy"]]: difficulty === "easy",
		[styles["medium"]]: difficulty === "medium",
		[styles["hard"]]: difficulty === "hard",
		[styles["shake"]]: isShaking
	});

	return (
		<div className={cardClasses} onClick={handleClick}>
			<div className={styles["content"]}>
				<h2>{title}</h2>
				<p>{description}</p>
				<div className={styles["tags"]}>
					{tags.map((tag) => (
						<Tag key={tag.label} label={tag.label} />
					))}
				</div>
			</div>
			{isToDo && (
				<div className={styles["locked"]}>
					<i className="bx bxs-lock-alt"></i>
				</div>
			)}
		</div>
	);
}

export default Card;
