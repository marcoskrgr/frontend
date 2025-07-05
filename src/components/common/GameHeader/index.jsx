import React from "react";
import Modal from "@components/Home/Modal";

import style from "./style.module.css";

export default function GameHeader({ task, timer, ContentHelp, isHelpOpen, setIsHelpOpen }) {
	const formatTime = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	};

	return (
		<>
			<div className={style.header}>
				<i className="bx bx-help-circle" onClick={() => setIsHelpOpen(true)}></i>
				<span className={style.task}>{task}</span>
				<span>{formatTime(timer)}</span>
			</div>

			<Modal
				onClose={() => setIsHelpOpen(false)}
				show={isHelpOpen}
				title="Ajuda"
			>
				<div className={style.modalContent}>
					<ContentHelp />
				</div>
			</Modal>
		</>
	);
}
