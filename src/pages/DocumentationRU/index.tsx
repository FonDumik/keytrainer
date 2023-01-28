import { AccordionDocumentationRU } from "widgets/AccordionDocumentationRU/ui";
import { HeaderDocumentation }from "widgets/HeaderDocumentation";
import styles from './styles.module.scss'

export default function DocumentationRU() {
  return (
    <div className={styles.documentation}>
      <div className='wrapper'>
        <HeaderDocumentation />
        <AccordionDocumentationRU />
      </div>
    </div>
  )
}
