import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AutoContext } from "../context";
import "../styles/header.css";
import Timer from "../UI/dropdown/Timer";

const Header = () => {
    const {isFinished, textLength, errors, timeWrite, setIsRestart} = useContext(AutoContext);
    const [currentErrors, setCurrentErrors] = useState('--')
    const [currentSpeed, setCurrentSpeed] = useState('--')
    let isComplete = false;

    useEffect(() => {
        if(isFinished === true){
            setCurrentErrors(String(errors))
        }

        if(isFinished === true && isComplete === false){
            setCurrentSpeed(Math.floor(textLength/(timeWrite/60000)));
            isComplete = true;
        }

    }, [isFinished, isComplete])

    return(
        <header>
            <div className="wrapper">
                <div className="header__container">
                <div className="header__left">
                <a href="#">
                   <img src="logo.png" alt="logo" />
                </a>
                <button className="text_reset"
                        onClick={() => {
                            setIsRestart(true);
                        }}>
                    <img src="restart.png" alt="" width='20px'/>
                </button>
            </div>
            <Timer/>
            <div className="header__right">
                <div className="speed">
                    <img src="speed.png" alt="sp" width='20'/>
                    <p title="Скорость печати, симв/мин">{currentSpeed}</p>
                </div>
                <div className="mistakes">
                    <img src="stop.png" alt="" width='20'/>
                    <p title="Число ошибок">{currentErrors}</p>
                </div>
            </div>
                </div>
            </div>
        </header>
    )
}

export default Header;