import { ButtonKey } from "entities/ButtonKey";
import { useCallback, useEffect } from "react";
import { useClikDispatch, useClikSelector } from "shared/hooks/ClikClikHooks";
import { usePressedKey } from "shared/hooks/usePressedKey";
import { returnKeyList, showPressedKey } from "../model";
import styles from "./styles.module.scss";

const InteractableKeyboard = () => {
  const { keyList, letterTypo, counterTypo } = useClikSelector(
    (state) => state.InteractiveKeyboardReducer
  );
  const dispatch = useClikDispatch();

  const changeKeyboard = useCallback(() => {
    dispatch(showPressedKey(letterTypo));
    setTimeout(() => {
      dispatch(returnKeyList());
    }, 100);
  }, [letterTypo, counterTypo]);

  useEffect(() => {
    changeKeyboard();
  }, [changeKeyboard]);

  function renderContentKey(content1: string, content2: string | undefined) {
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
  }

  return (
    <div className={styles.keyboard}>
      {keyList.map((elem) => (
        <ButtonKey setType={elem.setType} selected={elem.selected}>
          {renderContentKey(elem.content1, elem.content2)}
        </ButtonKey>
      ))}
    </div>
  );
};

export default InteractableKeyboard;
