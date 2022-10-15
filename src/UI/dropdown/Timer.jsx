import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AutoContext } from "../../context";
import classes from "./Timer.module.css";

const Timer = (props) => {
    const {isStarted, setIsStarted, time, timeWrite, setTime, currentTime, setCurrentTime} = useContext(AutoContext)
    let [classMenu, setMenuClass] = useState(classes.hidden);


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
                <img src="time.png" alt="t" width='20'/>
                <button className={classes.switch}
                        onClick={() => {setMenuClass(classes.showMenu)}}
                        ><p>{timer(currentTime)}</p></button>
            </div>

            <div className={classMenu}>
                <button className={classes.closeMenu}
                        onClick={() => {setMenuClass(classes.hidden)}}
                        >X</button>
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
        </div>
    )
}

export default Timer;