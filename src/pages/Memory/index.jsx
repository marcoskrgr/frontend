import React, { useState, useEffect } from "react";

import GridMemory from "@components/Memory/GridMemory";
import GameHeader from "@components/common/GameHeader";
import FinishModal from "@components/common/FinishModal";
import Help from "@components/Memory/Help";

function Memory() {
	const [gameFinished, setGameFinished] = useState(false);
	const [timer, setTimer] = useState(0);
	const [isHelpOpen, setIsHelpOpen] = useState(false);

	useEffect(() => {
		if (gameFinished || isHelpOpen) return;

		const interval = setInterval(() => {
			setTimer((prev) => prev + 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [gameFinished, isHelpOpen]);

	return (
		<div style={{ padding: "24px" }}>
			<GameHeader
				task="Task #2"
				timer={timer}
				ContentHelp={Help}
				isHelpOpen={isHelpOpen}
				setIsHelpOpen={setIsHelpOpen}
			/>
			<GridMemory setGameFinished={setGameFinished} />
			<FinishModal time={timer} showModal={gameFinished} />
		</div>
	);
}

export default Memory;
