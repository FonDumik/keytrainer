import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../../shared/hooks";
import classes from "./ButtonKey.module.scss";

type buttonKeyInterface = {
   setType: string,
   selected: boolean,
   children: any
}

const ButtonKey = ({ setType, selected, children }: buttonKeyInterface) => {
   const lastLetter = useAppSelector(state => state.inputTextReducer.lastLetter)
   const [style, setClass] = useState('');

   function renderKey(){
      switch (setType){
         case '1':
            return classes.f1_1
         case '1.1':
            return classes.f1_2
         case '3':
            return classes.f3
         case '4':
            return classes.f4
         case '5':
            return classes.f5
         case 'sys enter':
            return `${classes.sys} ${classes.enter}`
         case 'sys backspace':
            return `${classes.sys} ${classes.backspace}`;
         case 'sys shift':
            return `${classes.sys} ${classes.shift}`;
         case 'sys tab':
            return `${classes.sys} ${classes.tab} ${classes.sys_left}`;
         case 'sys caps':
            return `${classes.sys} ${classes.caps} ${classes.sys_left}`;
         case 'sys space':
            return `${classes.sys} ${classes.space}`;
      }
   }

   useEffect(() => {
      if(selected === true){
         setClass(renderKey() + ` ${classes.active}`);
      }else {
         setClass(renderKey())
      }
   }, [selected]) 

    return(
        <div className={style}>
            {children}
        </div>
    )
}

export default ButtonKey;