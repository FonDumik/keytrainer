import React from 'react';
import { useState } from 'react';
import styles from './styles.module.scss'
import './animation.css'
import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useContext } from 'react';
import { AutoContext } from '../../context';

function ConfigureTraining() {
    const {setConfigurationTraining} = useContext(AutoContext)
    const nodeRef = useRef()

    const [isOpen, setIsOpen] = useState(false)

    const [textConfiguration, setTextConfiguration] = useState('Русский начальный')

    function setNewConfiguration(e, language, mode){
        e.preventDefault()
        setConfigurationTraining({
            language,
            mode
        })
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
            <div className={styles.showMenu} ref={nodeRef} dismissible>
                <button className={styles.closeMenu} onClick = {() => setIsOpen(false)}>
                    <img src="./img/close-button.png" alt="" />
                </button>
                <section className={styles.configuration__sectionMenu}>
                    <p>Русский</p>
                    <a href=""  onClick={(e) => {setNewConfiguration(e, 'RU', 'start')}}>Стартовый</a>
                    <a href=""  onClick={(e) => {setNewConfiguration(e, 'RU', 'begin')}}>Начальный</a>
                    <a href=""  onClick={(e) => {setNewConfiguration(e, 'RU', 'training')}}>Тренировка</a>
                </section>
            </div>
            </CSSTransition>
        </div>
     );
}

export default ConfigureTraining;