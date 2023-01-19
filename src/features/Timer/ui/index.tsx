import React, { useEffect, useState } from "react";

import classes from "./Timer.module.scss";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { setSelectedTime, updateCurrentTime, renderToTimer } from "../model";
import { setIsStartedTime } from "../../../widgets/InputText";
import { DropdownObject } from "../../../entities/DropdownObject";

export const Timer = () => {
    const currentTime = useAppSelector(state => state.timerReducer.currentTime)
    const isTimeStarted = useAppSelector(state => state.inputTextReducer.isTimeStarted)
    const dispatch = useAppDispatch()

    let [isOpenMenu, setIsOpenMenu] = useState(false)

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
            <DropdownObject isOpenDropDownState={{state: isOpenMenu, action: setIsOpenMenu}} header={'Таймер'}>
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
            </DropdownObject>
        </div>
    )
}