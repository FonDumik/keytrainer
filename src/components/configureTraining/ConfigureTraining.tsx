import React, { useState, useEffect, useContext, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import styles from './styles.module.scss'
import './animation.css'
import { AutoContext } from '../../context';
import { setNewTextConfiguration } from './setTextConfiguration';

function ConfigureTraining() {
    const {setConfigurationTraining, configurationTraining} = useContext(AutoContext)
    const nodeRef = useRef()

    const [isOpen, setIsOpen] = useState(false)

    const [textConfiguration, setTextConfiguration] = useState('Русский стартовый')

    function setNewConfiguration(e: any, language: string, mode: string){
        e.preventDefault()
        setConfigurationTraining({
            language,
            mode
        })
        setIsOpen(false)
    }

    useEffect(() => {
        let text: string = setNewTextConfiguration(configurationTraining)
        setTextConfiguration(text)
    }, [configurationTraining])

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