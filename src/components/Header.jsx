import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AutoContext } from "../context";
import "../styles/header.css";
import Timer from "../UI/dropdown/Timer";

function average(array){
    if(array.length !== 0){
        let sum = 0
        for(let elem of array){
            sum = Number(sum + elem)
        }
        let number = Number(sum/array.length)
        return number.toFixed(2)
    }else{
        return '--'
    }
}

const Header = () => {
    const {isFinished, textLength, errors, timeWrite, setIsRestart} = useContext(AutoContext);
    const [currentErrors, setCurrentErrors] = useState('--')
    const [currentSpeed, setCurrentSpeed] = useState('--')
    const [arraySpeed, setArraySpeed] = useState([])
    const [arrayErrors, setArrayErrors] = useState([])
    let isComplete = false;

    useEffect(() => {
        if(isFinished === true){
            setCurrentErrors(String(errors))
            setArrayErrors([...arrayErrors, errors])
        }

        if(isFinished === true){
            setCurrentSpeed(Math.floor(textLength/(timeWrite/60000)));
            setArraySpeed([...arraySpeed, Math.floor(textLength/(timeWrite/60000))])
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
                    <p title="Скорость печати / Средняя скорость, симв/мин">{`${currentSpeed} / ${average(arraySpeed)}`}</p>
                </div>
                <div className="mistakes">
                    <img src="stop.png" alt="" width='20'/>
                    <p title="Число ошибок / Среднее число ошибок">{`${currentErrors} / ${average(arrayErrors)}`}</p>
                </div>
            </div>
                </div>
            </div>
        </header>
    )
}

export default Header;