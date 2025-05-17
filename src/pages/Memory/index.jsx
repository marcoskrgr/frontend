import React from "react";
import GridMemory from "../../components/Memory/GridMemory";
import GameHeader from "@components/common/GameHeader";

function Memory(){
    return(
        <div>
            <div className="grid-container">
                <GameHeader />
                <GridMemory />
            </div>
        </div>
    )
}

export default Memory;