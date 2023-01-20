import cn from 'classnames'

import { Timer } from "../../../features/Timer";
import styles from './styles.module.scss'
import { ConfigureTraining } from "../../../features/ConfigureTraining";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks"
import { average, setIsRestart } from "../model";
import { setSelectedTime } from "../../../features/Timer/model";
import { clearTextErrors, 
         setIsFinishedLine, 
         setIsStartedLine, 
         setIsStartedTime, 
         updateCurrentText, 
         updateRandomText } from "../../InputText";

export const Header = () => {
    const {speed, speedArray, errors, errorsArray} = useAppSelector(state => state.headerReducer)
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
                                onClick={restartTraining}
                        >
                            <img src="./img/restart.png" alt="" width='20px'/>
                        </button>
                        <ConfigureTraining />
                        <Timer/>
                    </div>
            <div className={cn(styles.header__right)}>
                <div className={cn(styles.speed)}>
                    <img src="./img/speed.png" alt="sp" width='20'/>
                    <p title="Скорость печати / Средняя скорость, симв/мин">
                        {`${speed} / ${average(speedArray)}`}
                    </p>
                </div>
                <div className={cn(styles.mistakes)}>
                    <img src="./img/stop.png" alt="" width='20'/>
                    <p title="Число ошибок / Среднее число ошибок">
                        {`${errors} / ${average(errorsArray)}`}
                    </p>
                </div>
            </div>
                </div>
            </div>
        </header>
    )
}