import { ButtonSection } from 'shared/ui/ButtonSection'
import styles from './styles.module.scss'

export function AppsSection() {
  return (
    <div className={styles.documentationSection}>
      <img src="./img/window.svg" alt=""  className={styles.description_icon}/>
      <ButtonSection link = '/klavaogr' styleSheet='klavaogr'>
        <img src='./img/keyboard.svg' alt='keykey'/>
        <p>Klavaogr</p>
      </ButtonSection>
      <ButtonSection link = '/clikclik' styleSheet='clikclik'>
        <img src='./img/c-square.svg' alt='clikclik'/>
        <p>ClikClik</p>
      </ButtonSection>
    </div>
  )
}
