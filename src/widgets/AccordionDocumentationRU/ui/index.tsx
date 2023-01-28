import { Accordion } from 'shared/ui/Accordion'
import styles from './styles.module.scss'

export const AccordionDocumentationRU = () => {
  return (
    <div className={styles.documentation__section}>
      <Accordion header='Klavaogr'>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur odit numquam quas!</p>
      </Accordion>
    </div>
  )
}