import ButtonKeyClikClik from "entities/ButtonKeyClikClik";
import { useCallback, useEffect, memo } from "react";
import { useClikDispatch, useClikSelector } from "shared/hooks/ClikClikHooks";
import { textInputConfig } from "widgets/InputTextClikClik";
import {
  changeKeyboard,
  clearSelectedKeys,
  clearTypoKeyboard,
  returnKeyList,
  setPriorityTypoKeys,
  showErrorKey,
  showSelectedKey,
} from "../model";
import styles from "./styles.module.scss";
import audio_alert from "shared/assets/tindeck_1.mp3";

const InteractableKeyboard = () => {
  const { keyList, letterTypo, counterTypo } = useClikSelector(
    (state) => state.InteractiveKeyboardReducer
  );
  const { inputText, isEndLine } = useClikSelector(
    (state) => state.InputTextClikClikReducer
  );
  const { configurationKeyboard } = useClikSelector(
    (state) => state.sidebarReducer
  );

  const dispatch = useClikDispatch();

  const setErrorKey = useCallback(() => {
    if (configurationKeyboard.isSoundError) {
      let audio = new Audio(audio_alert);
      audio.play();
    }
    if (!isEndLine) {
      dispatch(showErrorKey(letterTypo));
      setTimeout(() => {
        dispatch(returnKeyList(letterTypo));
      }, 5000);
    }
  }, [letterTypo, counterTypo]);

  const selectLetter = useCallback(() => {
    if (configurationKeyboard.keyHints && !isEndLine) {
      const lastLetter: textInputConfig = inputText.find(
        (elem) => elem.isSelected === true
      );
      dispatch(showSelectedKey(lastLetter.content));
    } else if (isEndLine) {
      dispatch(showSelectedKey("Enter"));
    } else {
      dispatch(clearSelectedKeys());
    }
  }, [inputText, configurationKeyboard]);

  useEffect(() => {
    selectLetter();
  }, [selectLetter]);

  useEffect(() => {
    setErrorKey();
  }, [setErrorKey]);

  useEffect(() => {
    if (isEndLine === true) {
      dispatch(setPriorityTypoKeys(inputText));
    } else {
      dispatch(clearTypoKeyboard());
    }
  }, [isEndLine]);

  useEffect(() => {
    dispatch(changeKeyboard(configurationKeyboard.language));
  }, [configurationKeyboard]);

  return (
    <div className={styles.keyboard}>
      {keyList.map((elem) => (
        <ButtonKeyClikClik config={elem} />
      ))}
    </div>
  );
};

export default memo(InteractableKeyboard);
