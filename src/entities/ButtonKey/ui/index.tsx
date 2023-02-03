import { useState, useEffect, FC } from "react";
import { renderDefault, renderKey } from "../model";
import classes from "./ButtonKey.module.scss";

type buttonKeyInterface = {
  setType: string;
  selected: boolean;
  isColored?: boolean;
  children: any;
};

export const ButtonKey: FC<buttonKeyInterface> = ({
  setType,
  selected,
  children,
  isColored,
}) => {
  const [style, setClass] = useState("");

  useEffect(() => {
    if (isColored === true) {
      if (selected === true) {
        setClass(renderKey(setType) + ` ${classes.active}`);
      } else {
        setClass(renderKey(setType));
      }
    } else {
      if (selected === true) {
        setClass(renderDefault(setType) + ` ${classes.active_default}`);
      } else {
        setClass(renderDefault(setType));
      }
    }
  }, [selected]);

  return <div className={style}>{children}</div>;
};
