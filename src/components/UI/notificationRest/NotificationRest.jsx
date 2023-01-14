import React, { useContext, useEffect, useState } from 'react'
import { AutoContext } from '../../../context'
import cn from 'classnames'
import styles from './NotificationRest.module.scss'

function NotificationRest({ input }) {
    const [classBreak, setClassBreak] = useState(cn(styles.window__break));
    const { setCurrentTime, time, setIsRestart, setIsStarted, currentTime, isRestart } = useContext(AutoContext)

    function backToTrain(e){
        e.preventDefault();
        setCurrentTime(time*60);
        setIsRestart(true);
        setClassBreak(cn(styles.window__break, styles.hidden));
    }

    useEffect(() => {
        if(currentTime <= 1){
            setClassBreak(cn(styles.window__break))
            input.current.blur()
            setIsStarted(false);
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
            <a href="" onClick={(e) => {backToTrain(e)}}>Продолжить</a>
        </div>
    );
}

export default NotificationRest;