import React, { useContext, useEffect, useState } from 'react'
import { AutoContext } from '../../context'

function NotificationRest({ input }) {
    const [classBreak, setClassBreak] = useState('window__break');
    const { setCurrentTime, time, setIsRestart, setIsStarted, currentTime, isRestart } = useContext(AutoContext)

    function backToTrain(e){
        e.preventDefault();
        setCurrentTime(time*60);
        setIsRestart(true);
        setClassBreak('window__break hidden');
    }

    useEffect(() => {
        if(currentTime <= 1){
            setClassBreak('window__break')
            input.current.blur()
            setIsStarted(false);
        }else{
            setClassBreak('window__break hidden')
        }
    }, [currentTime])

    useEffect(() => {
        if(isRestart === true && classBreak === 'window__break'){
            setClassBreak('window__break hidden')
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