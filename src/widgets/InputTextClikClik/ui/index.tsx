import { FC, useEffect, useState } from "react";
import { useClikDispatch, useClikSelector } from "shared/hooks/ClikClikHooks";
import styles from "./styles.module.scss";
import {
  updateTextInput,
  decreaseTextInput,
  setInputLetter,
  addTypos,
  addLetterCounter,
  clearLetterCounter,
  clearTypos,
} from "../model";
import {
  clearAccuracy,
  clearSpeed,
  updateAccuracy,
  updateSpeed,
} from "widgets/HeaderResults/model";

export const InputTextClikClik: FC = () => {
  const {
    textInput,
    lastLetter,
    completeText,
    inputLetter,
    letterCounter,
    inputTextLength,
    typos,
  } = useClikSelector((state) => state.InputTextClikClikReducer);
  const dispatch = useClikDispatch();

  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [intervalCounter, setIntervalCounter] = useState(0);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Shift") {
      dispatch(setInputLetter(e.code));
    } else {
      dispatch(setInputLetter(e.key));
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    const start = setInterval(() => {
      setIntervalCounter((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(start);
      document.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isStarted) {
      dispatch(updateSpeed(letterCounter));
      dispatch(clearLetterCounter());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intervalCounter]);

  useEffect(() => {
    if (inputLetter === lastLetter && textInput.length !== 0) {
      dispatch(decreaseTextInput());
      setIsStarted(true);
      dispatch(addLetterCounter());
    } else if (inputLetter === lastLetter && textInput.length === 0) {
      dispatch(updateTextInput());
      dispatch(clearTypos());
      dispatch(clearAccuracy());
      dispatch(clearSpeed());
      setIsStarted(false);
    }

    if (inputLetter !== lastLetter) {
      dispatch(addTypos());
      dispatch(updateAccuracy({ textLength: inputTextLength, typos }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputLetter]);

  return (
    <div className={styles.container}>
      <span className={styles.complete_text}>{completeText}</span>
      <span className={styles.last_letter}>{lastLetter}</span>
      <span className={styles.text_input}>{textInput}</span>
    </div>
  );
};
