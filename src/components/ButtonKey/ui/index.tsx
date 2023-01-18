import React, { useState, useEffect } from "react";
import { renderKey } from "../model";
import classes from "./ButtonKey.module.scss";

type buttonKeyInterface = {
   setType: string,
   selected: boolean,
   children: any
}

export const ButtonKey = ({ setType, selected, children }: buttonKeyInterface) => {
   const [style, setClass] = useState('');

   useEffect(() => {
      if(selected === true){
         setClass(renderKey(setType) + ` ${classes.active}`);
      }else {
         setClass(renderKey(setType))
      }
   }, [selected]) 

    return(
        <div className={style}>
            {children}
        </div>
    )
}