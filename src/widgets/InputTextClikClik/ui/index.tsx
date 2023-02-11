import { FC, useEffect, useState } from "react";
import { useClikDispatch, useClikSelector } from "shared/hooks/ClikClikHooks";
import styles from "./styles.module.scss";
import {
  updateTextInput,
  addTypos,
  addLetterCounter,
  clearLetterCounter,
  clearTypos,
  textInputConfig,
  updateLastLetterForward,
  initTypo,
  updateLastLetterBackward,
  setEndStroke,
} from "../model";
import {
  clearAccuracy,
  clearSpeed,
  updateAccuracy,
  updateSpeed,
} from "widgets/HeaderResults/model";
import { usePressedKey } from "shared/hooks/usePressedKey";
import { setArrayTypos, setLetterTypo } from "widgets/InteractableKeyboard";

export const InputTextClikClik: FC = () => {
  const { inputText, letterCounter, inputTextLength, typos, isEndLine } =
    useClikSelector((state) => state.InputTextClikClikReducer);
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
    const lastLetter: textInputConfig = inputText.find(
      (elem) => elem.isSelected === true
    );

    if (inputLetter === "Backspace" && isEndLine === false) {
      dispatch(updateLastLetterBackward());
    }

    if (
      lastLetter !== undefined &&
      inputLetter === lastLetter.content &&
      inputText.indexOf(lastLetter) !== inputText.length - 1 &&
      isEndLine === false
    ) {
      dispatch(updateLastLetterForward());
      setIsStarted(true);
      dispatch(addLetterCounter());
    }

    if (
      lastLetter !== undefined &&
      inputLetter === lastLetter.content &&
      inputText.indexOf(lastLetter) === inputText.length - 1 &&
      isEndLine === false
    ) {
      dispatch(setEndStroke());
      setIsStarted(false);
    }

    if (inputLetter === "Enter" && isEndLine === true) {
      dispatch(updateTextInput());
      dispatch(clearTypos());
      dispatch(clearAccuracy());
      dispatch(clearSpeed());
    }

    if (
      lastLetter !== undefined &&
      inputLetter !== lastLetter.content &&
      inputText.indexOf(lastLetter) !== inputTextLength - 1 &&
      isEndLine === false
    ) {
      dispatch(setArrayTypos(lastLetter.content));
      errorHandler(inputLetter);
    }

    if (
      lastLetter !== undefined &&
      inputLetter !== lastLetter.content &&
      inputText.indexOf(lastLetter) === inputTextLength - 1
    ) {
      dispatch(setEndStroke());
      setIsStarted(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputLetter, counterInput]);

  const errorHandler = (inputLetter: string) => {
    if (
      inputLetter !== "ShiftLeft" &&
      inputLetter !== "ShiftRight" &&
      inputLetter !== "" &&
      inputLetter !== null &&
      inputLetter !== "Backspace"
    ) {
      dispatch(addTypos());
      dispatch(initTypo());
      dispatch(setLetterTypo(inputLetter));
      dispatch(updateAccuracy({ textLength: inputTextLength, typos }));
    }
  };

  function configureSpan(config: textInputConfig) {
    if (config.isSelected) {
      return <span className={styles.last_letter}>{config.content}</span>;
    } else if (config.correctlyPressed) {
      return <span className={styles.complete_text}>{config.content}</span>;
    } else if (config.typoPressed) {
      return <span className={styles.error}>{config.content}</span>;
    } else {
      return <span className={styles.text_input}>{config.content}</span>;
    }
  }

  return (
    <div className={styles.container}>
      {inputText.map((elem) => configureSpan(elem))}
    </div>
  );
};
