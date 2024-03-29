import classes from "../ui/ButtonKey.module.scss";

export function renderKey(setType: string) {
  switch (setType) {
    case "1":
      return classes.f1_1;
    case "1.1":
      return classes.f1_2;
    case "3":
      return classes.f3;
    case "4":
      return classes.f4;
    case "5":
      return classes.f5;
    case "sys enter":
      return `${classes.sys} ${classes.enter}`;
    case "sys backspace":
      return `${classes.sys} ${classes.backspace}`;
    case "sys shift":
      return `${classes.sys} ${classes.shift}`;
    case "sys tab":
      return `${classes.sys} ${classes.tab} ${classes.sys_left}`;
    case "sys caps":
      return `${classes.sys} ${classes.caps} ${classes.sys_left}`;
    case "sys space":
      return `${classes.sys} ${classes.space}`;
  }
}
