import React, { useContext, useEffect, useState, useRef } from "react";
import { AutoContext } from "../../context";
import classes from "./Timer.module.scss";
import {CSSTransition} from 'react-transition-group';
import './animation.css'

const Timer = () => {
    const {isStarted, setIsStarted, setTime, currentTime, setCurrentTime} = useContext(AutoContext)
    let [classMenu, setMenuClass] = useState(classes.hidden);
    let [isOpenMenu, setIsOpenMenu] = useState(false)
    const nodeRef = useRef(null);

    function chooseTime(e){
        setTime(Number(e.target.textContent));
        setCurrentTime(Number(e.target.textContent)*60)
        setIsStarted(false);
        setMenuClass(classes.hidden);
    }

    function timer(currentTime){
        let minutes = Math.floor((currentTime/60));
        let seconds = Math.floor(currentTime % 60);
        if(seconds < 10){
                seconds = '0'+seconds;
        }
        return `${minutes}:${seconds}`;       
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
            <CSSTransition nodeRef={nodeRef} 
                in={isOpenMenu} 
                timeout={300} 
                classNames="notification"
                unmountOnExit>
            <div className={classes.showMenu} ref={nodeRef} dismissible>
                <button className={classes.closeMenu}
                        onClick={() => setIsOpenMenu(false)}>
                                <img src="./img/close-button.png" alt="" />
                        </button>
                <button className={classes.switch}
                        onClick={chooseTime}><p>5</p></button>
                <button className={classes.switch}
                        onClick={chooseTime}><p>10</p></button>
                <button className={classes.switch}
                        onClick={chooseTime}><p>15</p></button>
                <button className={classes.switch}
                        onClick={chooseTime}><p>20</p></button>
                <button className={classes.switch}
                        onClick={chooseTime}><p>25</p></button>
                <button className={classes.switch}
                        onClick={chooseTime}><p>30</p></button>
            </div>
            </CSSTransition>
        </div>
    )
}

export default Timer;