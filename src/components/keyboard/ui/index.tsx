import React, { useEffect } from "react";
import cn from 'classnames'

import { ButtonKey } from "../../ButtonKey";
import styles from './styles.module.scss'
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { updateKeyboard } from "../../Keyboard";

export const Keyboard = () => {
    const lastLetter = useAppSelector(state => state.inputTextReducer.lastLetter)
    const keysList = useAppSelector((state) => state.keyboardReducer.keyList)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(updateKeyboard(lastLetter))
    }, [lastLetter])

    function renderContentKey(content1: string, content2: string){
        if(content2 !== undefined){
            return (
                <section>
                    <p>{content1}</p>
                    <sup>{content2}</sup>
                </section>
            )
        }else if(content2 === undefined){
            return (
                <section>
                    <p>{content1}</p>
                </section>
            )
        }
    }

    return(
        <section className={cn(styles.keyboard)}>
            {keysList.map(elem => 
                <ButtonKey setType = {elem.setType} selected = {elem.selected}>
                    {renderContentKey(elem.content1, elem.content2)}
                </ButtonKey>
            )}
        </section>
    )
}