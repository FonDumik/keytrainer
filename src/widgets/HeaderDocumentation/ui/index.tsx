import { MenuSection } from 'features/MenuSection'
import styles from './styles.module.scss'

export const HeaderDocumentation = () => {
  return (
    <div className="wrapper_documentation">
        <div className={styles.header}>
            <MenuSection />
        </div>
    </div>
  )
}