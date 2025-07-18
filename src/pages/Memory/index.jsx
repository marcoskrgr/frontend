import React, {useState, useEffect} from "react";

import GridMemory from "@components/Memory/GridMemory";
import GameHeader from "@components/common/GameHeader";
import FinishModal from "@components/common/FinishModal";
import Help from "@components/Memory/Help";

import styles from "./style.module.css"

function Memory() {
	const [gameFinished, setGameFinished] = useState(false);
	const [isHelpOpen, setIsHelpOpen] = useState(false);

	return (
		<div className={styles["container"]}>
			<GameHeader task="Task #2" ContentHelp={Help} isHelpOpen={isHelpOpen} setIsHelpOpen={setIsHelpOpen} />
			<GridMemory setGameFinished={setGameFinished} />
			<FinishModal showModal={gameFinished} />
		</div>
	);
}

export default Memory;
