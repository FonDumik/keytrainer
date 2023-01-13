import React, { useContext, useRef, useEffect, useState } from "react";
import { AutoContext } from "../../context";
import NotificationRest from "../../UI/notificationRest/NotificationRest";
import cn from 'classnames'
import styles from './styles.module.scss'

function InputText() {
    const {setIsFinished,
        setIsStarted,  
        setTimeWrite,
        errors,
        setErrors,
        setIsRestart,
        randomText,
        setLastLetter,
        setText,
        currentText} = useContext(AutoContext);

    const [styleInput, setStyleInput] = useState(cn(styles.input_text));
    const [styleText, setStyleText] = useState(cn(styles.text));
    const inputValue = useRef();
    let wasError = false;

    useEffect(() => {
        setLastLetter(randomText[0]);
    }, [randomText]);

    const [timeStart, setTimeStart] = useState(0);
    const [timeFinish, setTimeFinish] = useState(0);

    function writeText() {
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
            setErrors(errors + 1);
            inputValue.current.maxLength = inputValue.current.value.length;
            setStyleInput(cn(styles.input_text, styles.error_input));
            setStyleText(cn(styles.text, styles.error_text));
        } else {
            setLastLetter(randomText[value.length]);
            inputValue.current.maxLength = randomText.length;
            setStyleInput(cn(styles.input_text));
            setStyleText(cn(styles.text));
        }
    }
    return (
        <section className={cn(styles.input)}>
            <div className="wrapper">
                <div className={cn(styles.input__container)}>
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
                        <div className={cn(styles.checked)}>{currentText}</div>
                        <div className={cn(styles.line1)}>{randomText}</div>
                    </div>
                    <NotificationRest input = {inputValue}/>
                </div>
            </div>
        </section>
    );
}

export default InputText;