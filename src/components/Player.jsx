import { useState } from "react"

export default function Player({initialName, symbol}){

    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    function handleSelect (){
        setIsEditing(editing => !editing);
    }

    function handleChange (event){
        setPlayerName(event.target.value);
    }

    let inPlayerName = <span className="player-name">{playerName}</span>
    
    if (isEditing) {
        inPlayerName = <input type="text" required value={playerName} onChange={handleChange}/> 
    }

    return(
        <li>
            <span className="player">
                {inPlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleSelect}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    )
}