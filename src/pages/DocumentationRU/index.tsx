import { useEffect } from "react";
import { AccordionDocumentationRU } from "widgets/AccordionDocumentationRU/ui";
import { HeaderDocumentation } from "widgets/HeaderDocumentation";
import styles from "./styles.module.scss";

export default function DocumentationRU() {
  useEffect(() => {
    document.title = "Справка";
    document.querySelector("html").style.backgroundColor = "#dddddd";
  }, []);

  return (
    <div className={styles.documentation}>
      <div className="wrapper_documentation">
        <HeaderDocumentation />
        <AccordionDocumentationRU />
      </div>
    </div>
  );
}
