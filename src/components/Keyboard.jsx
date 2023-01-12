import React, { useContext, useEffect } from "react";
import htmlToReact from "html-to-react";
import ButtonKey from "../UI/keys/ButtonKey";
import { AutoContext } from "../context";
import { useState } from "react";
import { arrayList, keysCases } from "../keyboardPresets/keyboardRU";
import { setFirstSelect, setSelectedShift } from "../keyboardPresets/common";

const Keyboard = () => {
    const {lastLetter} = useContext(AutoContext);
    let HtmlToReact = new require('html-to-react');
    let htmlToReactParser = new HtmlToReact.Parser(React);
    const [keysList, setKeysList] = useState(setFirstSelect(arrayList, lastLetter, keysCases))

    function selectDownCase(letter, keysList){
        setKeysList(keysList.map(elem => {
            elem.selected = false;
            if(elem.content.indexOf(letter.toUpperCase()) !== Number(-1)){
                elem.selected = true;
            }
            return elem
        }))
    }
    
    function selectUpperCase(letter, keysList){
        setKeysList(keysList.map(elem => {
            elem.selected = false;
            if(elem.content.indexOf(letter) !== Number(-1)){
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
            if (keysCases[elem].indexOf(lastLetter) !== -1) {
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

    return(
        <section className="keyboard">
            {keysList.map(elem => 
                <ButtonKey setType = {elem.setType} selected = {elem.selected}>
                    {htmlToReactParser.parse(elem.content)}
                </ButtonKey>
            )}
        </section>
    )
}

export default Keyboard;