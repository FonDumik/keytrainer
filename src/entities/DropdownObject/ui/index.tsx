import React, { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './styles.module.scss'
import './animation.css'

type DropdownObjectProps = {
    isOpenDropDownState: {
        state: boolean,
        action: any
    }
    children: any,
    header: string
}

export const DropdownObject = ({isOpenDropDownState, children, header}: DropdownObjectProps) => {
    const nodeRef = useRef()

    const closeDropdown = () => {
        return isOpenDropDownState.action(false)
    }
    
    return(
        <CSSTransition 
                nodeRef={nodeRef} 
                in={isOpenDropDownState.state} 
                timeout={300} 
                classNames="dropdown"
                unmountOnExit
        >
        <div className={styles.showMenu} ref={nodeRef}>
            <div className={styles.dropdown__header}>
                <p className={styles.header__text}>{header}</p>
                <button className={styles.header__closeButton}
                        onClick={closeDropdown}
                >
                    <img src="./img/close-button.png" alt="" />
                </button>
            </div>
            {children}
        </div>
        </CSSTransition>
    )
}