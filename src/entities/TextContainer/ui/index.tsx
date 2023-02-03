import { useEffect } from "react";
import { useKlavaogrDispatch, useKlavaogrSelector } from "shared/hooks";
import {
  resetComplexText,
  updateComplexText,
  setRandomTextTraining,
  updateRandomText,
} from "../model";
import { setLastLetter } from "features/InputCurrentText/model";
import styles from "./styles.module.scss";

export function TextContainer() {
  const { isFinishedLine } = useKlavaogrSelector(
    (state) => state.inputCurrentTextReducer
  );
  const { configuration } = useKlavaogrSelector(
    (state) => state.configurationTrainingReducer
  );
  const { isRestart } = useKlavaogrSelector((state) => state.headerReducer);
  const { complexText, randomText } = useKlavaogrSelector(
    (state) => state.textContainerReducer
  );
  const dispatch = useKlavaogrDispatch();

  let configurationRUSimpleText =
    configuration.language === "RU" &&
    (configuration.mode === "start" || configuration.mode === "begin");
  let configurationENGSimpleText =
    configuration.language === "ENG" &&
    (configuration.mode === "start" || configuration.mode === "begin");
  let configurationRUComplexText =
    configuration.language === "RU" && configuration.mode === "training";
  let configurationENGComplexText =
    configuration.language === "ENG" && configuration.mode === "training";

  useEffect(() => {
    dispatch(setLastLetter(randomText[0]));
  }, [randomText]);

  useEffect(() => {
    if (
      isFinishedLine &&
      (configurationRUComplexText || configurationENGComplexText)
    ) {
      if (complexText.length === 1) {
        dispatch(resetComplexText(configuration.language));
      } else {
        dispatch(updateComplexText());
      }
    } else if (
      isFinishedLine &&
      (configurationRUSimpleText || configurationENGSimpleText)
    ) {
      dispatch(updateRandomText(configuration));
    }
  }, [isFinishedLine]);

  useEffect(() => {
    dispatch(setRandomTextTraining(complexText[0]));
  }, [complexText]);

  useEffect(() => {
    if (configurationRUComplexText || configurationENGComplexText) {
      dispatch(resetComplexText(configuration.language));
    } else if (configurationRUSimpleText || configurationENGSimpleText) {
      dispatch(updateRandomText(configuration));
    }
  }, [configuration]);

  useEffect(() => {
    if (configurationRUComplexText || configurationENGComplexText) {
      dispatch(resetComplexText(configuration.language));
    } else if (configurationRUSimpleText || configurationENGSimpleText) {
      dispatch(updateRandomText(configuration));
    }
  }, [isRestart]);

  return (
    <div>
      {configurationRUSimpleText || configurationENGSimpleText ? (
        <div className={styles.line}>{randomText}</div>
      ) : (
        <div className={styles.complexText}>
          {complexText.map((elem) => (
            <div className={styles.line}>{elem}</div>
          ))}
        </div>
      )}
    </div>
  );
}
