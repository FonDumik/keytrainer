import { useState, useEffect, FC, useCallback, memo } from "react";
import { keyboardConfiguration } from "widgets/InteractableKeyboard/config/keyboardRU";
import { renderDefault } from "../lib/renderKey";
import classes from "./styles.module.scss";

type buttonKeyInterface = {
  config: keyboardConfiguration;
};

const ButtonKeyClikClik: FC<buttonKeyInterface> = ({ config }) => {
  const [style, setClass] = useState("");
  const { selected, setType, content1, content2, errorPressed, errorPriority } =
    config;

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

  const setError = useCallback(() => {
    if (errorPressed === true) {
      setClass(renderDefault(setType) + ` ${classes.error_default}`);
    } else {
      setClass(renderDefault(setType));
    }
  }, [errorPressed]);

  useEffect(() => {
    setError();
  }, [setError]);

  const setSelected = useCallback(() => {
    if (selected === true) {
      setClass(renderDefault(setType) + ` ${classes.active_default}`);
    } else {
      setClass(renderDefault(setType));
    }
  }, [selected]);

  useEffect(() => {
    setSelected();
  }, [setSelected]);

  const setPriority = useCallback(() => {
    switch (errorPriority) {
      case 1:
        return setClass(renderDefault(setType) + ` ${classes.error_1prior}`);
      case 2:
        return setClass(renderDefault(setType) + ` ${classes.error_2prior}`);
      case 3:
        return setClass(renderDefault(setType) + ` ${classes.error_3prior}`);
      default:
        return setClass(renderDefault(setType));
    }
  }, [errorPriority]);

  useEffect(() => {
    setPriority();
  }, [setPriority]);

  return <div className={style}>{renderContentKey(content1, content2)}</div>;
};

export default memo(ButtonKeyClikClik);
