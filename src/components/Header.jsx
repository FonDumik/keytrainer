import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { AutoContext } from "../context";
import "../styles/header.css";
import Timer from "../UI/dropdown/Timer";

const Header = () => {
    const {isFinished, textLength, errors, timeWrite, isRestart, setIsRestart} = useContext(AutoContext);
    let isComplete = false;
    function setSpeed(isFinished, textLength, timeWrite){
        if(isFinished === true && isComplete === false){
            const currentSpeed = Math.floor(textLength/(timeWrite/60000));
            isComplete = true;
            return currentSpeed;
        }else{
            return 0;
        }
    }

    function setError(errors){
        if(isFinished){
            return errors;
        }else{
            return 0;
        }
    }

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
                    <p title="Скорость печати, симв/мин">{setSpeed(isFinished, textLength, timeWrite)}</p>
                </div>
                <div className="mistakes">
                    <img src="stop.png" alt="" width='20'/>
                    <p title="Число ошибок">{setError(errors)}</p>
                </div>
            </div>
                </div>
            </div>
        </header>
    )
}

export default Header;