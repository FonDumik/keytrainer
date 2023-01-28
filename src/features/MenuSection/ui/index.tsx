import { useRef, useState } from 'react'
import { PrimaryButton } from 'shared/ui/PrimaryButton'
import { CSSTransition } from 'react-transition-group'
import styles from './styles.module.scss'
import './animation.css'
import { Link } from 'react-router-dom'

export const MenuSection = () => {
    const [isOpen, setIsOpen] = useState(false)
    const nodeRef = useRef()

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

  return (
    <div className={styles.menu_container}>
        <PrimaryButton styleSheet='menu' onClick={toggleDropdown}>
            <img src="./img/list.svg" alt="menu" />
        </PrimaryButton>
        <CSSTransition
            in={isOpen} 
            timeout={300} 
            classNames="dropdown"
            unmountOnExit
            nodeRef={nodeRef}
        >
            <div 
                className={styles.menu_hiddenContent}
                ref={nodeRef}
            >
                <Link to = '/'>
                    <PrimaryButton styleSheet='home'>
                        <img src="./img/house-door-fill.svg" alt="" />
                    </PrimaryButton>
                </Link>
            </div>
        </CSSTransition>
    </div>
  )
}