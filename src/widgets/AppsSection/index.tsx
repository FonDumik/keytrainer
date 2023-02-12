import { ButtonSection } from "shared/ui/ButtonSection";
import styles from "./styles.module.scss";

import keyboardImg from "shared/assets/keyboard.svg";
import CiImg from "shared/assets/c-square.svg";
import windowImg from "shared/assets/window.svg";

export function AppsSection() {
  return (
    <div className={styles.documentationSection}>
      <img src={windowImg} alt="" className={styles.description_icon} />
      <ButtonSection link="/klavaogr" styleSheet="klavaogr">
        <img src={keyboardImg} alt="keykey" />
        <p>Klavaogr</p>
      </ButtonSection>
      <ButtonSection link="/clikclik" styleSheet="clikclik">
        <img src={CiImg} alt="clikclik" />
        <p>ClikClik</p>
      </ButtonSection>
    </div>
  );
}
