import { useState } from 'react';

import styles from './styles.module.scss'
import { useAppDispatch, useAppSelector } from 'shared/hooks'
import { updateConfigurationText, updateConfigurationTraining } from '../model'
import { setIsRestart } from "widgets/Header"
import { setSelectedTime } from "features/Timer"
import { clearTextErrors, 
         setIsFinishedLine,
         setIsStartedLine, 
         setIsStartedTime, 
         updateCurrentText } from "widgets/InputText";
import { DropdownObject } from 'shared/ui/DropdownObject';


export const ConfigureTraining = () => {
    const textConfiguration = useAppSelector(state => state.configurationTrainingReducer.configurationText)
    const selectedTime = useAppSelector(state => state.timerReducer.selectedTime)
    const dispatch = useAppDispatch()

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
        dispatch(updateCurrentText(''))
        dispatch(setIsStartedTime(false))
        dispatch(setIsStartedLine(false))
        dispatch(setIsFinishedLine(false))
        dispatch(setIsRestart(false))
        setIsOpen(false)
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
            <DropdownObject isOpenDropDownState={{state: isOpen, action: setIsOpen}} header={'Выберите режим'}>
                <section className={styles.configuration__sectionMenu}>
                    <p>Русский</p>
                    <a href='' onClick={configureRuStart}>Стартовый</a>
                    <a href='' onClick={configureRuBegin}>Начальный</a>
                    <a href='' onClick={configureRuTraining}>Тренировка</a>
                </section>
            </DropdownObject>
        </div>
     );
}