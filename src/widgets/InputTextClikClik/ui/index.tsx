import { FC, useEffect } from "react";
import { useClikDispatch, useClikSelector } from "shared/hooks/ClikClikHooks";
import styles from "./styles.module.scss";
import { updateTextInput, decreaseTextInput, setInputLetter } from "../model";

export const InputTextClikClik: FC = () => {
  const { textInput, lastLetter, completeText, inputLetter } = useClikSelector(
    (state) => state.InputTextClikClikReducer
  );
  const dispatch = useClikDispatch();

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Shift") {
      dispatch(setInputLetter(e.code));
    } else {
      dispatch(setInputLetter(e.key));
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (inputLetter === lastLetter && textInput.length !== 0) {
      dispatch(decreaseTextInput());
    } else if (inputLetter === lastLetter && textInput.length === 0) {
      dispatch(updateTextInput());
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
