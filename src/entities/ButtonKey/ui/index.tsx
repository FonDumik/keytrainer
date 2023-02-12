import { useState, useEffect, FC, memo, useCallback } from "react";
import { renderKey } from "../lib/renderKey";
import classes from "./ButtonKey.module.scss";

type buttonKeyInterface = {
  setType: string;
  selected: boolean;
  children: any;
};

export const ButtonKey: FC<buttonKeyInterface> = ({
  setType,
  selected,
  children,
}) => {
  const [style, setClass] = useState("");

  const setSelected = useCallback(() => {
    if (selected) {
      setClass(renderKey(setType) + ` ${classes.active}`);
    } else {
      setClass(renderKey(setType));
    }
  }, [selected, setType]);

  useEffect(() => {
    setSelected();
  }, [setSelected]);

  return <div className={style}>{children}</div>;
};

export default memo(ButtonKey);
