import { useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.scss'
import { useAppDispatch, useAppSelector } from 'shared/hooks'
import { setSelectedTime } from 'features/Timer'
import { setIsStartedTime } from 'features/InputCurrentText/model'
import { setIsRestart } from 'widgets/Header'

export const NotificationRest = () => {
    const [classBreak, setClassBreak] = useState(cn(styles.window__break));

    const {selectedTime, currentTime} = useAppSelector(state => state.timerReducer)
    const isRestart = useAppSelector(state => state.headerReducer.isRestart)

    const dispatch = useAppDispatch()

    function backToTrain(e: any){
        e.preventDefault();
        setIsRestart(!isRestart)
        dispatch(setSelectedTime(selectedTime))
        setClassBreak(cn(styles.window__break, styles.hidden));
    }

    useEffect(() => {
        if(currentTime <= 1){
            setClassBreak(cn(styles.window__break))
            dispatch(setIsStartedTime(false))
        }else{
            setClassBreak(cn(styles.window__break, styles.hidden))
        }
    }, [currentTime])

    useEffect(() => {
        if(isRestart === true && classBreak === styles.window__break){
            setClassBreak(cn(styles.window__break, styles.hidden))
        }
    }, [isRestart])

    return ( 
        <div className = {classBreak}>
            <p>Время вышло, пора отдохнуть</p>
            <a href='#' onClick={backToTrain}>Продолжить</a>
        </div>
    );
}