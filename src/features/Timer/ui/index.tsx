import { useEffect, useState } from "react";

import styles from "./Timer.module.scss";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { setSelectedTime, updateCurrentTime, renderToTimer } from "../model";
import { setIsStartedTime } from "../../../widgets/InputText";
import { DropdownObject } from "../../../entities/DropdownObject";

export const Timer = () => {
    const { currentTime } = useAppSelector(state => state.timerReducer)
    const { isTimeStarted } = useAppSelector(state => state.inputTextReducer)
    const dispatch = useAppDispatch()

    let [isOpenMenu, setIsOpenMenu] = useState(false)

    const chooseTime = (selectedTime: number) => {
        dispatch(setSelectedTime(selectedTime))
        dispatch(setIsStartedTime(false));
        setIsOpenMenu(false);
    }

    useEffect(() => {
        if(isTimeStarted){
                setTimeout(() => dispatch(updateCurrentTime()), 1000);
        }
    }, [isTimeStarted, currentTime])

    const openMenu = () => {
        return setIsOpenMenu(true)
    }

    return(
        <div className={styles.timer}>
            <div className={styles.current}>
                <img src="./img/time.png" alt="t" width='20'/>
                <button className={styles.switch}
                        onClick={openMenu}
                >
                        <p>{renderToTimer(currentTime)}</p>
                </button>
            </div>
            <DropdownObject isOpenDropDownState={{state: isOpenMenu, action: setIsOpenMenu}} header={'Таймер'}>
                    <button className={styles.switch}
                            onClick={() => chooseTime(5)}><p>5:00</p></button>
                    <button className={styles.switch}
                            onClick={() => chooseTime(10)}><p>10:00</p></button>
                    <button className={styles.switch}
                            onClick={() => chooseTime(15)}><p>15:00</p></button>
                    <button className={styles.switch}
                            onClick={() => chooseTime(20)}><p>20:00</p></button>
                    <button className={styles.switch}
                            onClick={() => chooseTime(25)}><p>25:00</p></button>
                    <button className={styles.switch}
                            onClick={() => chooseTime(30)}><p>30:00</p></button>
            </DropdownObject>
        </div>
    )
}