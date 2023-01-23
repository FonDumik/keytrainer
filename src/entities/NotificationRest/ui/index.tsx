import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.scss'
import { useAppDispatch, useAppSelector } from 'shared/hooks'
import { setSelectedTime } from 'features/Timer'
import { setIsStartedTime } from 'widgets/InputText'

interface notificationRestProps {
    input: React.MutableRefObject<any>
}

export const NotificationRest = ({ input }: notificationRestProps) => {
    const [classBreak, setClassBreak] = useState(cn(styles.window__break));

    const {selectedTime, currentTime} = useAppSelector(state => state.timerReducer)
    const isRestart = useAppSelector(state => state.headerReducer.isRestart)

    const dispatch = useAppDispatch()

    function backToTrain(e: any){
        e.preventDefault();
        dispatch(setSelectedTime(selectedTime))
        setClassBreak(cn(styles.window__break, styles.hidden));
    }

    useEffect(() => {
        if(currentTime <= 1){
            setClassBreak(cn(styles.window__break))
            input.current.blur()
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