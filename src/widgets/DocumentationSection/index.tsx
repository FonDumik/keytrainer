import { ButtonSection } from "shared/ui/ButtonSection";
import styles from "./styles.module.scss";

export function DocumentationSection() {
  return (
    <div className={styles.documentationSection}>
      <img
        src="./img/file-earmark-text.svg"
        alt=""
        className={styles.description_icon}
      />
      <ButtonSection link="/documentationRU" styleSheet="documentation">
        Русский
      </ButtonSection>
      <ButtonSection link="/documentationENG" styleSheet="documentation">
        English
      </ButtonSection>
    </div>
  );
}
