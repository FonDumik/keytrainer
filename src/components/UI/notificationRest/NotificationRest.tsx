import React, { useContext, useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './NotificationRest.module.scss'
import { useAppDispatch, useAppSelector } from '../../../shared/hooks'
import { setSelectedTime } from '../../Timer/model'
import { setIsStartedTime } from '../../inputText/model'

interface notificationRestProps {
    input: React.MutableRefObject<any>
}

function NotificationRest({ input }: notificationRestProps) {
    const [classBreak, setClassBreak] = useState(cn(styles.window__break));

    const selectedTime = useAppSelector(state => state.timerReducer.selectedTime)
    const currentTime = useAppSelector(state => state.timerReducer.currentTime)
    const isRestart = useAppSelector(state => state.headerReducer.isRestart)
    const dispatch = useAppDispatch()

    function backToTrain(e: Event){
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
            <a onClick={(e: any) => {backToTrain(e)}}>Продолжить</a>
        </div>
    );
}

export default NotificationRest;