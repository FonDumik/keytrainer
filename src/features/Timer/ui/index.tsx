import { useEffect, useState } from "react";
//styles
import styles from "./Timer.module.scss";
//hooks
import { useAppDispatch, useAppSelector } from "shared/hooks/reduxHooks";
import { renderToTimer } from "../lib/renderTimer";
import { setSelectedTime, updateCurrentTime } from "../model";
import { DropdownObject } from "shared/ui/DropdownObject";

import timeImg from "shared/assets/img/time.png";

const timeSelectCases = [5, 10, 15, 20, 25, 30];

export const Timer = () => {
  const { currentTime, selectedTime } = useAppSelector(
    (state) => state.timerReducer
  );
  const { isTimeStarted } = useAppSelector(
    (state) => state.inputCurrentTextReducer
  );
  const { isRestart } = useAppSelector(
    (state) => state.headerReducer
  );
  const dispatch = useAppDispatch();

  let [isOpenMenu, setIsOpenMenu] = useState(false);

  const chooseTime = (selectedTime: number) => {
    dispatch(setSelectedTime(selectedTime));
    setIsOpenMenu(false);
  };

  useEffect(() => {
    if (isTimeStarted) {
      setTimeout(() => dispatch(updateCurrentTime()), 1000);
    }
  }, [isTimeStarted, currentTime]);

  useEffect(() => {
    dispatch(setSelectedTime(selectedTime));
  }, [isRestart]);

  const openMenu = () => {
    return setIsOpenMenu(true);
  };

  return (
    <div className={styles.timer}>
      <div className={styles.current}>
        <img src={timeImg} alt="t" width="20" />
        <button className={styles.switch} onClick={openMenu}>
          <p>{renderToTimer(currentTime)}</p>
        </button>
      </div>
      <DropdownObject
        isOpenDropDownState={{ state: isOpenMenu, action: setIsOpenMenu }}
        header={"Таймер"}
      >
        {timeSelectCases.map((elem) => (
          <button className={styles.switch} onClick={() => chooseTime(elem)}>
            <p>{`${elem}:00`}</p>
          </button>
        ))}
      </DropdownObject>
    </div>
  );
};
