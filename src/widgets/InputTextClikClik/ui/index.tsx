import { FC, useEffect, useState } from "react";
import { useClikDispatch, useClikSelector } from "shared/hooks/ClikClikHooks";
import styles from "./styles.module.scss";
import {
  updateTextInput,
  decreaseTextInput,
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
import { usePressedKey } from "shared/hooks/usePressedKey";
import { setLetterTypo } from "widgets/InteractableKeyboard";

export const InputTextClikClik: FC = () => {
  const {
    textInput,
    lastLetter,
    completeText,
    letterCounter,
    inputTextLength,
    typos,
  } = useClikSelector((state) => state.InputTextClikClikReducer);
  const dispatch = useClikDispatch();

  const [inputLetter, counterInput] = usePressedKey();

  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [intervalCounter, setIntervalCounter] = useState(0);

  useEffect(() => {
    const start = setInterval(() => {
      setIntervalCounter((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(start);
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
      errorHandler(inputLetter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputLetter, counterInput]);

  const errorHandler = (inputLetter: string) => {
    if (
      inputLetter !== "ShiftLeft" &&
      inputLetter !== "ShiftRight" &&
      inputLetter !== "" &&
      inputLetter !== null
    ) {
      dispatch(addTypos());
      dispatch(setLetterTypo(inputLetter));
      dispatch(updateAccuracy({ textLength: inputTextLength, typos }));
    }
  };

  return (
    <div className={styles.container}>
      <span className={styles.complete_text}>{completeText}</span>
      <span className={styles.last_letter}>{lastLetter}</span>
      <span className={styles.text_input}>{textInput}</span>
    </div>
  );
};
