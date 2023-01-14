import React, { useContext, useEffect, useState } from "react";
import cn from 'classnames'

import ButtonKey from "../UI/keys/ButtonKey";
import { AutoContext } from "../../context";
import { arrayList, keysCases } from "../../shared/keyboardPresets/keyboardRU";
import { setFirstSelect, setSelectedShift } from "../../shared/keyboardPresets/common";
import styles from './styles.module.scss'
import { keyboardCasesKeys, keyboardConfiguration } from "../../types/keyboardConfiguration";

const Keyboard = () => {
    const {lastLetter} = useContext(AutoContext);
    const [keysList, setKeysList] = useState(setFirstSelect(arrayList, lastLetter, keysCases))

    function selectDownCase(letter: string, keysList: Array<keyboardConfiguration>){
        setKeysList(keysList.map(elem => {
            elem.selected = false;
            if(elem.content1 === letter.toUpperCase() || elem.content1 === letter){
                elem.selected = true;
            }
            return elem
        }))
    }
    
    function selectUpperCase(letter: string, keysList: Array<keyboardConfiguration>){
        setKeysList(keysList.map(elem => {
            elem.selected = false;
            if(elem.content1 === letter){
                elem.selected = true;
            }

            if(elem.needShift === 'left'){
                setSelectedShift('left', keysList)
            }else if(elem.needShift === 'right'){
                setSelectedShift('right', keysList)
            }
            return elem
        }))
    }

    useEffect(() => {
        for (let elem in keysCases) {
            if (keysCases[elem as keyof keyboardCasesKeys].indexOf(lastLetter) !== -1) {
                switch (elem) {
                    case 'downCase':
                        selectDownCase(lastLetter, keysList)
                        break;
                    case 'upperCase':
                        selectUpperCase(lastLetter, keysList)
                        break;
                    case 'symbols':
                        selectUpperCase(lastLetter, keysList)
                        break;
                    default:
                        break;
                }
            }
        }
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

export default Keyboard;