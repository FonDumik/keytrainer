import React, { useContext } from "react";
import cn from 'classnames'

import Timer from "../Timer/Timer";
import styles from './styles.module.scss'
import ConfigureTraining from "../configureTraining/ConfigureTraining";
import { useAppDispatch, useAppSelector } from "../../shared/hooks"
import { average, setIsRestart } from "./model";
import { setSelectedTime } from "../Timer/model";
import { clearTextErrors, setIsFinishedLine, setIsStartedLine, setIsStartedTime, updateCurrentText, updateRandomText } from "../inputText/model";

const Header = () => {
    const speedDisplay = useAppSelector((state) => state.headerReducer.speed)
    const speedArrayDisplay = useAppSelector((state) => state.headerReducer.speedArray)
    const errorsDisplay = useAppSelector((state) => state.headerReducer.errors)
    const errorsArrayDisplay = useAppSelector((state) => state.headerReducer.errorsArray)

    const selectedTime = useAppSelector(state => state.timerReducer.selectedTime)

    const configuration = useAppSelector(state => state.configurationTrainingReducer.configuration)

    const dispatch = useAppDispatch()

    function restartTraining(){
        dispatch(setIsRestart(true))
        dispatch(setSelectedTime(selectedTime))
        dispatch(clearTextErrors())
        dispatch(updateRandomText(configuration))
        dispatch(updateCurrentText(''))
        dispatch(setIsStartedTime(false))
        dispatch(setIsStartedLine(false))
        dispatch(setIsFinishedLine(false))
        dispatch(setIsRestart(false))
    }

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
                                restartTraining()
                            }}>
                            <img src="./img/restart.png" alt="" width='20px'/>
                        </button>
                        <ConfigureTraining />
                        <Timer/>
                    </div>
            <div className={cn(styles.header__right)}>
                <div className={cn(styles.speed)}>
                    <img src="./img/speed.png" alt="sp" width='20'/>
                    <p title="Скорость печати / Средняя скорость, симв/мин">{`${speedDisplay} / ${average(speedArrayDisplay)}`}</p>
                </div>
                <div className={cn(styles.mistakes)}>
                    <img src="./img/stop.png" alt="" width='20'/>
                    <p title="Число ошибок / Среднее число ошибок">{`${errorsDisplay} / ${average(errorsArrayDisplay)}`}</p>
                </div>
            </div>
                </div>
            </div>
        </header>
    )
}

export default Header;