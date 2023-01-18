import React, { useEffect, useState, useRef } from "react";
import { CSSTransition } from 'react-transition-group';

import classes from "./Timer.module.scss";
import './animation.css'
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { setSelectedTime, updateCurrentTime, renderToTimer } from "./model";
import { setIsStartedTime } from "../inputText/model";

const Timer = () => {
    const currentTime = useAppSelector(state => state.timerReducer.currentTime)
    const isTimeStarted = useAppSelector(state => state.inputTextReducer.isTimeStarted)
    const dispatch = useAppDispatch()

    let [isOpenMenu, setIsOpenMenu] = useState(false)
    const nodeRef = useRef(null);

    function chooseTime(selectedTime: number){
        dispatch(setSelectedTime(selectedTime))
        dispatch(setIsStartedTime(false));
        setIsOpenMenu(false);
    }

    useEffect(() => {
        if(isTimeStarted){
                const interval = setTimeout(() => {dispatch(updateCurrentTime())}, 1000)
                return () => clearInterval(interval)
        }
    })

    return(
        <div className={classes.timer}>
            <div className={classes.current}>
                <img src="./img/time.png" alt="t" width='20'/>
                <button className={classes.switch}
                        onClick={() => setIsOpenMenu(true)}>
                        <p>{renderToTimer(currentTime)}</p>
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
                            onClick={() => chooseTime(5)}><p>5:00</p></button>
                    <button className={classes.switch}
                            onClick={() => chooseTime(10)}><p>10:00</p></button>
                    <button className={classes.switch}
                            onClick={() => chooseTime(15)}><p>15:00</p></button>
                    <button className={classes.switch}
                            onClick={() => chooseTime(20)}><p>20:00</p></button>
                    <button className={classes.switch}
                            onClick={() => chooseTime(25)}><p>25:00</p></button>
                    <button className={classes.switch}
                            onClick={() => chooseTime(30)}><p>30:00</p></button>
                </div>
            </CSSTransition>
        </div>
    )
}

export default Timer;