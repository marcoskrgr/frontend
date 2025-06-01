import React from "react";

import GridMemory from "@components/Memory/GridMemory";
import GameHeader from "@components/common/GameHeader";

function Memory() {
	return (
		<div style={{ padding: "24px" }}>
			<GameHeader task="Task #2" />
			<GridMemory />
		</div>
	);
}

export default Memory;
