import { ButtonKey } from "entities/ButtonKey";
import { useEffect } from "react";
import { useClikDispatch, useClikSelector } from "shared/hooks/ClikClikHooks";
import { showPressedKey } from "../model";
import styles from "./styles.module.scss";

const InteractableKeyboard = () => {
  const keyList = useClikSelector(
    (state) => state.InteractiveKeyboardReducer.keyList
  );
  const dispatch = useClikDispatch();
  const { inputLetter } = useClikSelector(
    (state) => state.InputTextClikClikReducer
  );

  useEffect(() => {
    dispatch(showPressedKey(inputLetter));
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputLetter]);

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
