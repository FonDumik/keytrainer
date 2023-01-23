import { useState } from 'react';

import styles from './styles.module.scss'
import { useAppDispatch, useAppSelector } from 'shared/hooks'
import { updateConfigurationText, updateConfigurationTraining } from '../model'
import { setIsRestart } from "widgets/Header"
import { DropdownObject } from 'shared/ui/DropdownObject';

export const ConfigureTraining = () => {
    const textConfiguration = useAppSelector(state => state.configurationTrainingReducer.configurationText)
    const isRestart = useAppSelector(state => state.headerReducer.isRestart)
    const dispatch = useAppDispatch()

    const [isOpen, setIsOpen] = useState(false)

    function setNewConfiguration(e: any, language: string, mode: string){
        e.preventDefault()
        dispatch(updateConfigurationTraining({language, mode}))
        dispatch(updateConfigurationText({language,mode}))
        dispatch(setIsRestart(!isRestart))
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

    function configureENGStart(event: any){
        return setNewConfiguration(event, 'ENG', 'start')
    }

    function configureENGBegin(event: any){
        return setNewConfiguration(event, 'ENG', 'begin')
    }
    
    function configureENGTraining(event: any){
        return setNewConfiguration(event, 'ENG', 'training')
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
                <section className={styles.configuration__sectionMenu}>
                    <p>English</p>
                    <a href='' onClick={configureENGStart}>Start</a>
                    <a href='' onClick={configureENGBegin}>Begin</a>
                    <a href='' onClick={configureENGTraining}>Training</a>
                </section>
            </DropdownObject>
        </div>
     );
}