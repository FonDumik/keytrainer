import React, { useCallback, useContext } from "react";
import htmlToReact from "html-to-react";
import ButtonKey from "../UI/keys/ButtonKey";
import { AutoContext } from "../context";
import { useEffect } from "react";

const keysList = [
    {setType: '5', content: 'Ё'},
    {setType: '5', content: '1<sup>!</sup>'},
    {setType: '4', content: '2<sup>"</sup>'},
    {setType: '3', content: '3<sup>№</sup>'},
    {setType: '1.1', content: '4<sup>;</sup>'},
    {setType: '1.1', content: '5<sup>%</sup>'},
    {setType: '1', content: '6<sup>:</sup>'},
    {setType: '1', content: '7<sup>?</sup>'},
    {setType: '3', content: '8<sup>*</sup>'},
    {setType: '4', content: '9<sup>(</sup>'},
    {setType: '5', content: '0<sup>)</sup>'},
    {setType: '5', content: '-<sup>_</sup>'},
    {setType: '5', content: '=<sup>+</sup>'},
    {setType: 'sys backspace', content: 'backspace'},

    {setType: 'sys tab', content: 'Tab'},
    {setType: '5', content: 'Й'},
    {setType: '4', content: 'Ц'},
    {setType: '3', content: 'У'},
    {setType: '1.1', content: 'К'},
    {setType: '1.1', content: 'Е'},
    {setType: '1', content: 'Н'},
    {setType: '1', content: 'Г'},
    {setType: '3', content: 'Ш'},
    {setType: '4', content: 'Щ'},
    {setType: '5', content: 'З'},
    {setType: '5', content: 'Х'},
    {setType: '5', content: 'Ъ'},
    {setType: '5', content: '|<sup>/</sup>'},

    {setType: 'sys caps', content: 'CapsLock'},
    {setType: '5', content: 'Ф'},
    {setType: '4', content: 'Ы'},
    {setType: '3', content: 'В'},
    {setType: '1.1', content: 'А'},
    {setType: '1.1', content: 'П'},
    {setType: '1', content: 'Р'},
    {setType: '1', content: 'О'},
    {setType: '3', content: 'Л'},
    {setType: '4', content: 'Д'},
    {setType: '5', content: 'Ж'},
    {setType: '5', content: 'Э'},
    {setType: 'sys enter', content: 'Enter'},

    {setType: 'sys shift', content: 'Shift'},
    {setType: '5', content: 'Я'},
    {setType: '4', content: 'Ч'},
    {setType: '3', content: 'С'},
    {setType: '1.1', content: 'М'},
    {setType: '1.1', content: 'И'},
    {setType: '1', content: 'Т'},
    {setType: '1', content: 'Ь'},
    {setType: '3', content: 'Б'},
    {setType: '4', content: 'Ю'},
    {setType: '5', content: '.<sup>,</sup>'},
    {setType: 'sys shift', content: 'Shift'},

    {setType: 'sys space', content: ' '},    
];

const keysCases = {
    downCase: [' ','а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ь', 'ы', 'ъ', 'э', 'ю', 'я', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    upperCase: ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ь', 'Ы', 'Ъ', 'Э', 'Ю', 'Я'],
    simbols: ['!', '@', '#', '$', '%', '&', '?', '-', '+', '=', '~']
};

const Keyboard = (props) => {
    const {lastLetter, setObjectLetter, setShiftButton} = useContext(AutoContext);
    let HtmlToReact = new require('html-to-react');
    let htmlToReactParser = new HtmlToReact.Parser(React);
    const upperCase = useCallback(() => selectUpperCase(lastLetter, keysList), [lastLetter, selectUpperCase])
    const downCase = useCallback(() => selectDownCase(lastLetter, keysList), [lastLetter, selectDownCase])

    function selectDownCase(letter, keysList){
        keysList.map(elem => {
            setShiftButton();
            elem.selected = false;
            if(elem.content.indexOf(letter.toUpperCase()) !== Number(-1)){
                elem.selected = true;
                setObjectLetter(elem);
            }
        })
    }
    
    function selectUpperCase(letter, keysList){
        keysList.map(elem => {
            elem.selected = false;
            if(elem.content.indexOf(letter) !== Number(-1)){
                elem.selected = true;
                setObjectLetter(elem);
            }
            
            if(elem.setType === 'sys shift'){
                elem.selected = true;
                setShiftButton(elem);
            }
        })
    }

    useEffect(() => {
        for (let elem in keysCases) {
            if (keysCases[elem].indexOf(lastLetter) !== -1) {
                switch (elem) {
                    case 'downCase':
                        downCase(lastLetter, keysList);
                        break;
                    case 'upperCase':
                        upperCase(lastLetter, keysList);
                        break;
                    case 'symbols':
                        upperCase(lastLetter, keysList);
                        break;
                }
            }
        }
    }, [lastLetter, upperCase, downCase])

    return(
        <section className="keyboard">
            {keysList.map(elem => 
                <ButtonKey setType = {elem.setType} selected = {elem.selected} object = {elem}>{htmlToReactParser.parse(elem.content)}</ButtonKey>
            )}
        </section>
    )
}

export default Keyboard;