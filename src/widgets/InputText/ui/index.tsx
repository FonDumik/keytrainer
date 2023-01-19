import React, { useRef, useEffect, useState } from "react";
import cn from 'classnames'

import { NotificationRest } from "../../../features/NotificationRest";
import styles from './styles.module.scss'
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { updateCurrentText, 
        setLastLetter, 
        clearTextErrors, 
        updateTextErrors, 
        setIsStartedLine, 
        setIsFinishedLine, 
        setIsStartedTime, 
        updateRandomText } from '../../InputText'
import { updateErrors, updateSpeed } from "../../Header/model";

export const InputText = (): JSX.Element => {
    const { randomText, currentText, textErrors } = useAppSelector(state => state.inputTextReducer)
    const { currentTime, selectedTime } = useAppSelector(state => state.timerReducer)

    const configuration = useAppSelector(state => state.configurationTrainingReducer.configuration)
    
    const dispatch = useAppDispatch()

    const [styleInput, setStyleInput] = useState(cn(styles.input_text));
    const [styleText, setStyleText] = useState(cn(styles.text));
    const inputValue = useRef<any>();
    let wasError = false;

    useEffect(() => {
        dispatch(setLastLetter(randomText[0]));
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
            setTimeFinish(Date.now());
        }

        errorHandler(wasError);

        if (value.length === 1) {
            if(currentTime === selectedTime * 60){
                dispatch(setIsStartedTime(true))
            }
            dispatch(clearTextErrors());
            dispatch(setIsStartedLine(true))
            dispatch(setIsFinishedLine(false));
            setTimeStart(Date.now());
        }else if (value.length === randomText.length) {
            dispatch(setIsFinishedLine(true))
            dispatch(updateSpeed(Math.floor(randomText.length/((timeFinish - timeStart)/60000))))
            dispatch(updateErrors(textErrors))
            dispatch(updateCurrentText(''))
            dispatch(updateRandomText(configuration))
            dispatch(setLastLetter(randomText[0]))
        }
    }

    function errorHandler(wasError: boolean) {
        let value = inputValue.current.value;
        if (wasError) {
            dispatch(setLastLetter('Backspace'));
            dispatch(updateTextErrors())
            inputValue.current.maxLength = inputValue.current.value.length;
            setStyleInput(cn(styles.input_text, styles.error_input));
            setStyleText(cn(styles.text, styles.error_text));
        } else {
            dispatch(setLastLetter(randomText[value.length]))
            inputValue.current.maxLength = randomText.length;
            setStyleInput(cn(styles.input_text));
            setStyleText(cn(styles.text));
        }
    }

    return (
        <section className={cn(styles.input)}>
            <div className="wrapper">
                <div className={cn(styles.input__container)}>
                    <input 
                        type="text"
                        className={styleInput}
                        onInput={e => {
                            let target = e.target as HTMLInputElement
                            return dispatch(updateCurrentText(target.value))
                        }}
                        onChange={() => {
                            writeText();
                        }}
                        value={currentText}
                        maxLength={randomText.length}
                        ref={inputValue} 
                    />
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