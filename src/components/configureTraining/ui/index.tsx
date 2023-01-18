import React, { useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import styles from './styles.module.scss'
import './animation.css'
import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { updateConfigurationText, updateConfigurationTraining } from '../../ConfigureTraining';
import { setIsRestart } from "../../Header/model";
import { setSelectedTime } from "../../Timer/model";
import { clearTextErrors, 
         setIsFinishedLine,
         setIsStartedLine, 
         setIsStartedTime, 
         updateCurrentText, 
         updateRandomText } from "../../InputText";


export const ConfigureTraining = () => {
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

    function closeDropdown() {
        return setIsOpen(false)
    }

    function openDropdown() {
        return setIsOpen(true)
    }

    function configureRuStart(event: any){
        return setNewConfiguration(event, 'RU', 'start')
    }

    function configureRuBegin(event: any){
        return setNewConfiguration(event, 'RU', 'begin')
    }

    function configureRuTraining(event: any){
        return setNewConfiguration(event, 'RU', 'training')
    }

    return ( 
        <div className={styles.container__configuration}>
            <div className={styles.button__textConfiguration}>
                <button onClick={openDropdown}>
                    <p>{textConfiguration}</p>
                </button>
            </div>
            <CSSTransition 
                nodeRef={nodeRef} 
                in={isOpen} 
                timeout={300} 
                classNames="configuration"
                unmountOnExit
            >
                <div className={styles.showMenu} 
                     ref={nodeRef}
                >
                    <button className={styles.closeMenu} onClick = {closeDropdown}>
                        <img src="./img/close-button.png" alt="" />
                    </button>
                    <section className={styles.configuration__sectionMenu}>
                        <p>Русский</p>
                        <a href='' onClick={configureRuStart}>Стартовый</a>
                        <a href='' onClick={configureRuBegin}>Начальный</a>
                        <a href='' onClick={configureRuTraining}>Тренировка</a>
                    </section>
                </div>
            </CSSTransition>
        </div>
     );
}