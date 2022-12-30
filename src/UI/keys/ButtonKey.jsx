import React, { useContext, useState, useEffect } from "react";
import { AutoContext } from "../../context";
import classes from "./ButtonKey.module.css";

const ButtonKey = ({ setType, object, selected, children }) => {
   const {lastLetter, objectLetter, shiftButton} = useContext(AutoContext);
   const [style, setClass] = useState('');

   function renderKeys(){
      switch (setType){
         case '1':
            setClass(classes.f1_1)
            break;
         case '1.1':
            setClass(classes.f1_2)
            break;
         case '3':
            setClass(classes.f3)
            break;
         case '4':
            setClass(classes.f4)
            break;
         case '5':
            setClass(classes.f5)
            break;
         case 'sys enter':
            setClass(`${classes.sys} ${classes.enter} ${classes.sys_right}`)
            break;
         case 'sys backspace':
            setClass(`${classes.sys} ${classes.backspace} ${classes.sys_right}`);
            break;
         case 'sys shift':
            setClass(`${classes.sys} ${classes.shift}`);
            break;
         case 'sys tab':
            setClass(`${classes.sys} ${classes.tab} ${classes.sys_left}`);
            break;
         case 'sys caps':
            setClass(`${classes.sys} ${classes.caps} ${classes.sys_left}`);
            break;
         case 'sys space':
            setClass(`${classes.sys} ${classes.space}`);
            break;
      }
   }

   useEffect(() => {
      renderKeys();
   }, [])

   useEffect(() => {
      renderKeys();
      if(object === objectLetter && objectLetter.selected === true){
         setClass(style + ` ${classes.active}`);
      }else if(object !== objectLetter || selected === false){
         renderKeys();
      }
      
      if(object === shiftButton && shiftButton.selected === true){
         setClass(style + ` ${classes.active}`);
      }
   }, [lastLetter, objectLetter, shiftButton]) 

    return(
        <div className={style}>
            {children}
        </div>
    )
}

export default ButtonKey;