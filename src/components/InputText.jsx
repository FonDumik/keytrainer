import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AutoContext } from "../context";
import "../styles/InputText.css";

function InputText() {
    const {setIsFinished,
        setObjectLetter, 
        setIsStarted,  
        setTimeWrite,
        setCurrentTime,
        errors,
        setErrors,
        setIsRestart,
        time,
        currentTime,
        randomText,
        setLastLetter,
        setText,
        currentText} = useContext(AutoContext);

    const [styleInput, setStyleInput] = useState('input_text');
    const [styleText, setStyleText] = useState('text');
    const inputValue = React.createRef();
    let wasError = false;

    useEffect(() => {
        if(currentTime <= 1){
            setClassBreak('window__break')
            inputValue.current.blur();
            setIsStarted(false);
        }else{
            setClassBreak('window__break hidden')
        }
    }, [currentTime])

    useEffect(() => {
        setLastLetter(randomText[0]);
    }, [randomText, setLastLetter]);

    const [timeStart, setTimeStart] = useState(0);
    const [timeFinish, setTimeFinish] = useState(0);

    function writeText(e) {
        let value = inputValue.current.value;
        if (value[value.length - 1] === randomText[value.length - 1] && value.length !== randomText.length) {
            wasError = false;
            setTimeFinish(Date.now());
        } else if (value[value.length - 1] !== randomText[value.length - 1]) {
            wasError = true;
        } else if (value.length === randomText.length) {
            wasError = false;
            setIsRestart(true);
            setTimeFinish(Date.now());
        }
        errorHandler(wasError);

        if (value.length === 1) {
            setErrors(0);
            setIsStarted(true)
            setIsFinished(false);
            setTimeStart(Date.now());
        }else if (value.length === randomText.length) {
            setIsFinished(true);
            setTimeWrite(Number(timeFinish) - Number(timeStart));
        }
    }

    function errorHandler(wasError) {
        let value = inputValue.current.value;
        if (wasError) {
            setLastLetter('backspace');
            setObjectLetter({setType: 'sys backspace', content: 'backspace', selected: true});
            setErrors(errors + 1);
            inputValue.current.maxLength = inputValue.current.value.length;
            setStyleInput('input_text error_input');
            setStyleText('text error_text');
        } else {
            setLastLetter(randomText[value.length]);
            inputValue.current.maxLength = randomText.length;
            setStyleInput('input_text');
            setStyleText('text');
        }
    }

    const [classBreak, setClassBreak] = useState('window__break');

    function backToTrain(e){
        e.preventDefault();
        inputValue.current.blur();
        setCurrentTime(time*60);
        setIsRestart(true);
        setClassBreak('window__break hidden');
    }

    return (
        <section className="input">
            <div className="wrapper">
                <div className="input__container">
                    <input type="text"
                        className={styleInput}
                        onInput={e => setText(e.target.value)}
                        onChange={() => {
                            writeText();
                        }}
                        value={currentText}
                        maxLength={randomText.length}
                        ref={inputValue} />
                    <div className={styleText}>
                        <div className="checked">{currentText}</div>
                        <div className="line1">{randomText}</div>
                    </div>
                    <div className = {classBreak}>
                        <p>Время вышло, пора отдохнуть</p>
                        <a href=""
                           onClick={(e) => {
                            backToTrain(e);
                           }}>Продолжить</a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default InputText;