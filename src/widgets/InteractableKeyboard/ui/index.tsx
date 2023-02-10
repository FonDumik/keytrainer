import { ButtonKeyClikClik } from "entities/ButtonKeyClikClik/ui";
import { useCallback, useEffect } from "react";
import { useClikDispatch, useClikSelector } from "shared/hooks/ClikClikHooks";
import { textInputConfig } from "widgets/InputTextClikClik";
import {
  clearTypoKeyboard,
  returnKeyList,
  setPriorityTypoKeys,
  showErrorKey,
  showSelectedKey,
} from "../model";
import styles from "./styles.module.scss";

const InteractableKeyboard = () => {
  const { keyList, letterTypo, counterTypo } = useClikSelector(
    (state) => state.InteractiveKeyboardReducer
  );
  const { inputText, isEndLine } = useClikSelector(
    (state) => state.InputTextClikClikReducer
  );

  const dispatch = useClikDispatch();

  const changeKeyboard = useCallback(() => {
    if (!isEndLine) {
      dispatch(showErrorKey(letterTypo));
      setTimeout(() => {
        dispatch(returnKeyList());
      }, 100);
    }
  }, [letterTypo, counterTypo]);

  const selectLetter = useCallback(() => {
    if (isEndLine) {
      dispatch(showSelectedKey("Enter"));
    } else {
      const lastLetter: textInputConfig = inputText.find(
        (elem) => elem.isSelected === true
      );
      dispatch(showSelectedKey(lastLetter.content));
    }
  }, [inputText]);

  useEffect(() => {
    selectLetter();
  }, [selectLetter]);

  useEffect(() => {
    changeKeyboard();
  }, [changeKeyboard]);

  useEffect(() => {
    if (isEndLine === true) {
      dispatch(setPriorityTypoKeys());
    } else {
      dispatch(clearTypoKeyboard());
    }
  }, [isEndLine]);

  return (
    <div className={styles.keyboard}>
      {keyList.map((elem) => (
        <ButtonKeyClikClik config={elem} />
      ))}
    </div>
  );
};

export default InteractableKeyboard;
