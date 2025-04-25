import React from "react";
import GridMemory from "../../components/Memory/GridMemory";
import HeaderMemory from "../../components/Memory/Title";

function Memory(){
    return(
        <div>
            <div className="grid-container">
                <HeaderMemory taskName="Task 4" initialTime={180} score={0} gameStarted={true} />
                <GridMemory />
            </div>
        </div>
    )
}

export default Memory;