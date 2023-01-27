import { AccordionDocumentationRU } from "widgets/AccordionDocumentationRU/ui";
import styles from './styles.module.scss'

export default function DocumentationRU() {
  return (
    <div className={styles.documentation}>
      <div className='wrapper'>
        <AccordionDocumentationRU />
      </div>
    </div>
  )
}
