import React, { useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import styles from './styles.module.scss'
import './animation.css'
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import { updateConfigurationText, updateConfigurationTraining } from './model';
import { setIsRestart } from "../header/model";
import { setSelectedTime } from "../Timer/model";
import { clearTextErrors, setIsFinishedLine, setIsStartedLine, setIsStartedTime, updateCurrentText, updateRandomText } from "../inputText/model";


function ConfigureTraining() {
    const textConfiguration = useAppSelector(state => state.configurationTrainingReducer.configurationText)
    const selectedTime = useAppSelector(state => state.timerReducer.selectedTime)
    const dispatch = useAppDispatch()
    const nodeRef = useRef()

    const [isOpen, setIsOpen] = useState(false)

    function setNewConfiguration(e: any, language: string, mode: string){
        e.preventDefault()
        dispatch(updateConfigurationTraining({
            language,
            mode
        }))
        dispatch(updateConfigurationText({
            language,
            mode
        }))
        dispatch(setIsRestart(true))
        dispatch(setSelectedTime(selectedTime))
        dispatch(clearTextErrors())
        dispatch(updateRandomText({
            language,
            mode
        }))
        dispatch(updateCurrentText(''))
        dispatch(setIsStartedTime(false))
        dispatch(setIsStartedLine(false))
        dispatch(setIsFinishedLine(false))
        dispatch(setIsRestart(false))
        setIsOpen(false)
    }

    return ( 
        <div className={styles.container__configuration}>
            <div className={styles.button__textConfiguration}>
                <button onClick={() => setIsOpen(true)}>
                    <p>{textConfiguration}</p>
                </button>
            </div>
            <CSSTransition nodeRef={nodeRef} 
                in={isOpen} 
                timeout={300} 
                classNames="configuration"
                unmountOnExit>
            <div className={styles.showMenu} ref={nodeRef}>
                <button className={styles.closeMenu} onClick = {() => setIsOpen(false)}>
                    <img src="./img/close-button.png" alt="" />
                </button>
                <section className={styles.configuration__sectionMenu}>
                    <p>Русский</p>
                    <a href=""  onClick={(e: any) => {setNewConfiguration(e, 'RU', 'start')}}>Стартовый</a>
                    <a href=""  onClick={(e: any) => {setNewConfiguration(e, 'RU', 'begin')}}>Начальный</a>
                    <a href=""  onClick={(e: any) => {setNewConfiguration(e, 'RU', 'training')}}>Тренировка</a>
                </section>
            </div>
            </CSSTransition>
        </div>
     );
}

export default ConfigureTraining;