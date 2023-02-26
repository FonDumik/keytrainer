import { useState } from "react";
import ButtonKeyClikClik from "entities/ButtonKeyClikClik";
import { useCallback, useEffect, memo } from "react";
import { useAppDispatch, useAppSelector } from "shared/hooks/reduxHooks";
import { textInputConfig } from "shared/types/textInputConfig";
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
import audio_alert from "shared/assets/audio/tindeck_1.mp3";

const InteractableKeyboard = () => {
  const { keyList, letterTypo, counterTypo } = useAppSelector(
    (state) => state.InteractiveKeyboardReducer
  );
  const { inputText, isEndLine } = useAppSelector(
    (state) => state.InputTextClikClikReducer
  );
  const { configurationKeyboard } = useAppSelector(
    (state) => state.sidebarReducer
  );

  const dispatch = useAppDispatch();

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

  const [isVisibleHints, setIsVisible] = useState(true);

  const selectLetter = useCallback(() => {
    if (isVisibleHints && !isEndLine) {
      const lastLetter: textInputConfig = inputText.find(
        (elem) => elem.isSelected === true
      );
      dispatch(showSelectedKey(lastLetter.content));
    }

    if (isEndLine) {
      dispatch(showSelectedKey("Enter"));
    }

    if (!isVisibleHints && !isEndLine) {
      dispatch(clearSelectedKeys());
    }
  }, [inputText, isVisibleHints]);

  useEffect(() => {
    if (configurationKeyboard.keyHints) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [configurationKeyboard]);

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
    <div className={styles.keyboard} data-testid="int-keyboard">
      {keyList.map((elem) => (
        <ButtonKeyClikClik config={elem} />
      ))}
    </div>
  );
};

export default memo(InteractableKeyboard);
