import { useState } from 'react'
import { PrimaryButton } from 'shared/ui/PrimaryButton'
import AnimateHeight from 'react-animate-height'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'

export const MenuSection = () => {
    const [height, setHeight] = useState<"auto" | number>(0)

    const toggleDropdown = () => {
        return setHeight(height === 0 ? 'auto' : 0)
    }

  return (
    <div className={styles.menu_container}>
        <PrimaryButton 
            styleSheet='menu' 
            aria-expanded={height !== 0}
            aria-controls="open_menu"
            onClick={toggleDropdown}
        >
            <img src="./img/list.svg" alt="menu" />
        </PrimaryButton>

        <AnimateHeight
            id="open_menu"
            duration={300}
            height={height}
        >
            <div 
                className={styles.menu_hiddenContent}
            >
                <Link to = '/'>
                    <PrimaryButton styleSheet='home'>
                        <img src="./img/house-door-fill.svg" alt="" />
                    </PrimaryButton>
                </Link>
            </div>
        </AnimateHeight>
    </div>
  )
}