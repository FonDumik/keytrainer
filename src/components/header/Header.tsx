import React, { useContext, useState, useEffect } from "react";
import cn from 'classnames'

import { AutoContext } from "../../context";
import Timer from "../UI/dropdown/Timer";
import styles from './styles.module.scss'
import ConfigureTraining from "../configureTraining/ConfigureTraining";

function average(array: Array<number>){
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
    const [currentErrors, setCurrentErrors] = useState<string | number>('--')
    const [currentSpeed, setCurrentSpeed] = useState<string | number>('--')
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
                <div className={cn(styles.header__container)}>
                    <div className={cn(styles.header__left)}>
                        <a href="#" >
                            <img src="./img/logo.png" alt="logo" className={cn(styles.logo)}/>
                        </a>
                        <button className={cn(styles.text_reset)}
                            onClick={() => {
                                setIsRestart(true);
                            }}>
                            <img src="./img/restart.png" alt="" width='20px'/>
                        </button>
                        <ConfigureTraining />
                    </div>
            <Timer/>
            <div className={cn(styles.header__right)}>
                <div className={cn(styles.speed)}>
                    <img src="./img/speed.png" alt="sp" width='20'/>
                    <p title="Скорость печати / Средняя скорость, симв/мин">{`${currentSpeed} / ${average(arraySpeed)}`}</p>
                </div>
                <div className={cn(styles.mistakes)}>
                    <img src="./img/stop.png" alt="" width='20'/>
                    <p title="Число ошибок / Среднее число ошибок">{`${currentErrors} / ${average(arrayErrors)}`}</p>
                </div>
            </div>
                </div>
            </div>
        </header>
    )
}

export default Header;