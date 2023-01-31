import { useEffect, useState } from "react";
//styles
import styles from "./Timer.module.scss";
//hooks
import * as hooks from "shared/hooks";

import { setSelectedTime, updateCurrentTime, renderToTimer } from "../model";
import { DropdownObject } from "shared/ui/DropdownObject";

const timeSelectCases = [5, 10, 15, 20, 25, 30];

export const Timer = () => {
  const { currentTime, selectedTime } = hooks.useAppSelector(
    (state) => state.timerReducer
  );
  const { isTimeStarted } = hooks.useAppSelector(
    (state) => state.inputCurrentTextReducer
  );
  const { isRestart } = hooks.useAppSelector((state) => state.headerReducer);
  const dispatch = hooks.useAppDispatch();

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
        <img src="./img/time.png" alt="t" width="20" />
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
