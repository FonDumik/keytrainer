import { useEffect, useState } from "react";
import cn from "classnames";

import styles from "./styles.module.scss";

import { useAppDispatch, useAppSelector } from "shared/hooks";

import { setIsStartedTime } from "features/InputCurrentText/model";
import { TextContainer } from "entities/TextContainer";
import { NotificationRest } from "entities/NotificationRest";
import { InputCurrentText } from "features/InputCurrentText/ui";

export const InputText = () => {
  const { selectedTime } = useAppSelector((state) => state.timerReducer);
  const { wasError, currentText } = useAppSelector(
    (state) => state.inputCurrentTextReducer
  );
  const dispatch = useAppDispatch();
  const [styleText, setStyleText] = useState(cn(styles.text));

  useEffect(() => {
    dispatch(setIsStartedTime(false));
  }, [selectedTime]);

  useEffect(() => {
    if (wasError) {
      setStyleText(cn(styles.text, styles.error_text));
    } else {
      setStyleText(cn(styles.text));
    }
  }, [wasError]);

  return (
    <section className={cn(styles.input)}>
      <div className="wrapper">
        <div className={cn(styles.input__container)}>
          <InputCurrentText />
          <div className={styleText}>
            <div className={styles.checked}>{currentText}</div>
            <TextContainer />
          </div>
          <NotificationRest />
        </div>
      </div>
    </section>
  );
};
