import { memo, useCallback, useEffect } from "react";

import styles from "./styles.module.scss";

import ButtonKey from "entities/ButtonKey";
import { changeKeyboard, updateKeyboard } from "../model";

import { useKlavaogrDispatch, useKlavaogrSelector } from "shared/hooks";

const Keyboard = () => {
  const { lastLetter } = useKlavaogrSelector(
    (state) => state.inputCurrentTextReducer
  );
  const { keyList } = useKlavaogrSelector((state) => state.keyboardReducer);
  const { configuration } = useKlavaogrSelector(
    (state) => state.configurationTrainingReducer
  );
  const dispatch = useKlavaogrDispatch();

  const setLastLetter = useCallback(() => {
    dispatch(updateKeyboard(lastLetter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastLetter]);

  useEffect(() => {
    setLastLetter();
  }, [setLastLetter]);

  const renderContentKey = useCallback(
    (content1: string, content2: string | undefined) => {
      if (content2 !== undefined) {
        return (
          <section>
            <p>{content1}</p>
            <sup>{content2}</sup>
          </section>
        );
      } else if (content2 === undefined) {
        return (
          <section>
            <p>{content1}</p>
          </section>
        );
      }
    },
    []
  );

  const setKeyboardByConfig = useCallback(() => {
    if (configuration.language === "RU") {
      dispatch(changeKeyboard("RU"));
    } else if (configuration.language === "ENG") {
      dispatch(changeKeyboard("ENG"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configuration]);

  useEffect(() => {
    setKeyboardByConfig();
  }, [setKeyboardByConfig]);

  return (
    <section className={styles.keyboard}>
      {keyList.map((elem) => (
        <ButtonKey setType={elem.setType} selected={elem.selected}>
          {renderContentKey(elem.content1, elem.content2)}
        </ButtonKey>
      ))}
    </section>
  );
};

export default memo(Keyboard);
