import { useState, useRef, useEffect } from 'react'
import cn from 'classnames'
import { useAppDispatch, useAppSelector } from "shared/hooks";
import styles from './styles.module.scss'
import { updateErrors, updateSpeed } from "widgets/Header";
import { updateCurrentText, 
    setLastLetter, 
    clearTextErrors, 
    updateTextErrors, 
    setIsStartedLine, 
    setIsFinishedLine, 
    setIsStartedTime,
    setWasError } from '../model'

export function InputCurrentText() {
    const { randomText } = useAppSelector(state => state.textContainerReducer)
    const { currentText, textErrors, wasError } = useAppSelector(state => state.inputCurrentTextReducer)
    const { currentTime, selectedTime } = useAppSelector(state => state.timerReducer)
    const { isRestart } = useAppSelector(state => state.headerReducer)
    const dispatch = useAppDispatch()

    const [styleInput, setStyleInput] = useState(cn(styles.input_text));

    const inputValue = useRef<any>();

    const [timeStart, setTimeStart] = useState(0);
    const [timeFinish, setTimeFinish] = useState(0);

    const writeText = () => {
        let value = inputValue.current.value;
        let lastIndexText = value.length - 1
        if (value[lastIndexText] === randomText[lastIndexText] && value.length !== randomText.length) {
            dispatch(setWasError(false))
            dispatch(setLastLetter(randomText[value.length]))
            setTimeFinish(Date.now());
        } else if (value[lastIndexText] !== randomText[lastIndexText]) {
            dispatch(setWasError(true))
        } else if (value.length === randomText.length) {
            dispatch(setWasError(false))
            setTimeFinish(Date.now());
        }

        if (currentText.length === 1) {
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
            dispatch(setLastLetter(randomText[0]))
        }
    }

    const updateInput = (e: any) => {
        let target = e.target as HTMLInputElement
        return dispatch(updateCurrentText(target.value))
    }

    useEffect(() => {
        let value = inputValue.current.value;
        if (wasError === true) {
            dispatch(setLastLetter('Backspace'));
            dispatch(updateTextErrors())
            inputValue.current.maxLength = inputValue.current.value.length;
            setStyleInput(cn(styles.input_text, styles.error_input));
        } else {
            dispatch(setLastLetter(randomText[value.length]))
            inputValue.current.maxLength = randomText.length;
            setStyleInput(styles.input_text);
        }
    }, [wasError])

    useEffect(() => {
        dispatch(setWasError(false))
        dispatch(clearTextErrors())
        dispatch(updateCurrentText(''))
        dispatch(setIsStartedTime(false))
        dispatch(setIsStartedLine(false))
        dispatch(setIsFinishedLine(false))
    }, [isRestart])

  return (
    <div className={styles.inputText__container}>
        <input 
            type="text"
            className={styleInput}
            onInput={updateInput}
            onChange={writeText}
            value={currentText}
            maxLength={randomText.length}
            ref={inputValue} 
        />
    </div>
  )
}
