import { PrimaryButton } from '../PrimaryButton'
import styles from './styles.module.scss'
import { CSSTransition } from 'react-transition-group'
import { useRef, useState } from 'react'
import './animation.css'

export const Accordion = ({ children, header }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [styleImg, setStyleImg] = useState(styles.button__img)

    const nodeRef = useRef()

    const toggleContent = () => {
        if(isOpen){
            setStyleImg(styles.button__img)
        }else{
            setStyleImg(styles.button__img_active)
        }
        return setIsOpen(!isOpen)
    }

  return (
    <div className={styles.accordion}>
        <div className={styles.accordion__header}>
            <h1>{header}</h1>
            <PrimaryButton onClick = {toggleContent}>
                <img src="./img/chevron-down.svg" alt=""  className={styleImg}/>
            </PrimaryButton>
        </div>
        
        <CSSTransition
            ref={nodeRef}
            in={isOpen} 
            timeout={300} 
            classNames="accordion"
            unmountOnExit
        >
            <div 
                className={styles.accordion__content}
                ref={nodeRef}
            >
                {children}
            </div>
        </CSSTransition>    
    </div>
  )
}