import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "shared/hooks/reduxHooks";
import styles from "./styles.module.scss";
import {
  updateTextInput,
  addTypos,
  addLetterCounter,
  clearLetterCounter,
  updateLastLetterForward,
  initTypo,
  updateLastLetterBackward,
  setEndStroke,
} from "../model";
import { textInputConfig } from "shared/types/textInputConfig";
import {
  clearAccuracy,
  clearSpeed,
  updateAccuracy,
  updateSpeed,
} from "widgets/HeaderResults/model";
import { usePressedKey } from "shared/hooks/usePressedKey";
import { setArrayTypos, setLetterTypo } from "widgets/InteractableKeyboard";

export const InputTextClikClik: FC = () => {
  const { inputText, letterCounter, inputTextLength, isEndLine } =
    useAppSelector((state) => state.InputTextClikClikReducer);
  const { configurationText } = useAppSelector((state) => state.sidebarReducer);
  const dispatch = useAppDispatch();

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

    if (
      inputLetter === "Backspace" &&
      isEndLine === false &&
      inputText.indexOf(lastLetter) !== 0
    ) {
      dispatch(updateLastLetterBackward());
      dispatch(updateAccuracy(inputText));
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
      dispatch(updateAccuracy(inputText));
    }

    if (
      lastLetter !== undefined &&
      inputLetter === lastLetter.content &&
      inputText.indexOf(lastLetter) === inputText.length - 1 &&
      isEndLine === false
    ) {
      dispatch(setEndStroke());
      setIsStarted(false);
      dispatch(updateAccuracy(inputText));
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
      inputLetter !== "ShiftLeft" &&
      inputLetter !== "ShiftRight" &&
      inputLetter !== "" &&
      inputLetter !== null &&
      inputLetter !== "Backspace" &&
      inputText.indexOf(lastLetter) === inputTextLength - 1
    ) {
      dispatch(setEndStroke());
      setIsStarted(false);
    }

    if (inputLetter === "Enter" && isEndLine === true) {
      dispatch(updateTextInput(configurationText));
      dispatch(clearAccuracy());
      dispatch(clearSpeed());
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
    }
  };

  function configureSpan(config: textInputConfig) {
    if (config.isSelected) {
      return <span className={styles.last_letter}>{config.content}</span>;
    } else if (config.typoPressed) {
      return <span className={styles.error}>{config.content}</span>;
    } else if (config.correctlyPressed) {
      return <span className={styles.complete_text}>{config.content}</span>;
    } else {
      return <span className={styles.text_input}>{config.content}</span>;
    }
  }

  useEffect(() => {
    dispatch(updateTextInput(configurationText));
    dispatch(clearAccuracy());
    dispatch(clearSpeed());
  }, [configurationText]);

  function configureSpanOnEnd(config: textInputConfig) {
    if (config.isSelected) {
      return <span className={styles.last_letter}>{config.content}</span>;
    } else if (config.correctlyPressed && !config.isTypo) {
      return <span className={styles.complete_text}>{config.content}</span>;
    } else if (config.isTypo) {
      return <span className={styles.error}>{config.content}</span>;
    } else {
      return <span className={styles.text_input}>{config.content}</span>;
    }
  }

  return (
    <div className={styles.container}>
      {isEndLine
        ? inputText.map((elem) => configureSpanOnEnd(elem))
        : inputText.map((elem) => configureSpan(elem))}
    </div>
  );
};
