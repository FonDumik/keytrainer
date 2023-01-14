import React, { useContext, useEffect, useState, useRef } from "react";
import { CSSTransition } from 'react-transition-group';

import { AutoContext } from "../../../context";
import classes from "./Timer.module.scss";
import './animation.css'

function timer(currentTime: number){
    let minutes: number = Math.floor((currentTime/60));
    let seconds: number | string = Math.floor(currentTime % 60);
    if(seconds < 10){
            seconds = '0'+seconds;
    }
    return `${minutes}:${seconds}`;       
}

const Timer = () => {
    const {isStarted, setIsStarted, setTime, currentTime, setCurrentTime} = useContext(AutoContext)
    let [isOpenMenu, setIsOpenMenu] = useState(false)
    const nodeRef = useRef(null);

    function chooseTime(selectedTime: number){
        setTime(selectedTime);
        setCurrentTime(selectedTime*60)
        setIsStarted(false);
        setIsOpenMenu(false);
    }

    useEffect(() => {
        if(isStarted){
                setTimeout(() => {
                        setCurrentTime(currentTime - 1)
                }, 1000)
        }
    })

    return(
        <div className={classes.timer}>
            <div className={classes.current}>
                <img src="./img/time.png" alt="t" width='20'/>
                <button className={classes.switch}
                        onClick={() => setIsOpenMenu(true)}>
                        <p>{timer(currentTime)}</p>
                </button>
            </div>
            <CSSTransition 
                nodeRef={nodeRef} 
                in={isOpenMenu} 
                timeout={300} 
                classNames="notification"
                unmountOnExit>
                <div className={classes.showMenu} ref={nodeRef}>
                    <button className={classes.closeMenu}
                            onClick={() => setIsOpenMenu(false)}>
                                    <img src="./img/close-button.png" alt="" />
                            </button>
                    <button className={classes.switch}
                            onClick={() => chooseTime(5)}><p>5</p></button>
                    <button className={classes.switch}
                            onClick={() => chooseTime(10)}><p>10</p></button>
                    <button className={classes.switch}
                            onClick={() => chooseTime(15)}><p>15</p></button>
                    <button className={classes.switch}
                            onClick={() => chooseTime(20)}><p>20</p></button>
                    <button className={classes.switch}
                            onClick={() => chooseTime(25)}><p>25</p></button>
                    <button className={classes.switch}
                            onClick={() => chooseTime(30)}><p>30</p></button>
                </div>
            </CSSTransition>
        </div>
    )
}

export default Timer;