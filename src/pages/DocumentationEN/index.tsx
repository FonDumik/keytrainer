import { useEffect } from "react";
import { HeaderDocumentation } from "widgets/HeaderDocumentation";
import styles from "./styles.module.scss";
import { AccordionDocsEN } from "features/AccordionDocsEN";

export default function DocumentationRU() {
  useEffect(() => {
    document.title = "Help";
    document.querySelector("html").style.backgroundColor = "#dddddd";
  }, []);

  return (
    <div className={styles.documentation}>
      <div className="wrapper_documentation">
        <HeaderDocumentation />
        <AccordionDocsEN />
      </div>
    </div>
  );
}
