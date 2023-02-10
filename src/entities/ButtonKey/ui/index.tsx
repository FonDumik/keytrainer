import { useState, useEffect, FC } from "react";
import { renderKey } from "../model";
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
}) => {
  const [style, setClass] = useState("");

  useEffect(() => {
    if (selected === true) {
      setClass(renderKey(setType) + ` ${classes.active}`);
    } else {
      setClass(renderKey(setType));
    }
  }, [selected]);

  return <div className={style}>{children}</div>;
};
