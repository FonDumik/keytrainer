import { useEffect, useState } from "react";
//styles
import styles from "./Timer.module.scss";
//hooks
import * as hooks from "shared/hooks";
import { renderToTimer } from "../lib/renderTimer";
import { setSelectedTime, updateCurrentTime } from "../model";
import { DropdownObject } from "shared/ui/DropdownObject";

import timeImg from "shared/assets/time.png";

const timeSelectCases = [5, 10, 15, 20, 25, 30];

export const Timer = () => {
  const { currentTime, selectedTime } = hooks.useKlavaogrSelector(
    (state) => state.timerReducer
  );
  const { isTimeStarted } = hooks.useKlavaogrSelector(
    (state) => state.inputCurrentTextReducer
  );
  const { isRestart } = hooks.useKlavaogrSelector(
    (state) => state.headerReducer
  );
  const dispatch = hooks.useKlavaogrDispatch();

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
