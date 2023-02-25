import { ButtonSection } from "shared/ui/ButtonSection";
import styles from "./styles.module.scss";

import docImg from "shared/assets/img/file-earmark-text.svg";

export function DocumentationSection() {
  return (
    <div className={styles.documentationSection}>
      <img src={docImg} alt="docImg" className={styles.description_icon} />
      <ButtonSection link="/documentationRU" styleSheet="documentation">
        Русский
      </ButtonSection>
      <ButtonSection link="/documentationENG" styleSheet="documentation">
        English
      </ButtonSection>
    </div>
  );
}
