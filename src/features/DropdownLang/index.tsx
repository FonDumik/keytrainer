import styles from "./styles.module.scss";
import russianFlag from "shared/assets/russia.png";
import englishFlag from "shared/assets/united-kingdom.png";
import AnimateHeight from "react-animate-height";
import { useState } from "react";

const DropdownLanguage = () => {
  const [height, setHeight] = useState<"auto" | number>(0);

  const toggleDropdown = () => {
    return setHeight(height === 0 ? "auto" : 0);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.major_section}
        aria-controls="open_dropdown_content"
        onClick={toggleDropdown}
      >
        <img src={russianFlag} alt="" />
        <p>Ru</p>
        <span className={styles.little_arrow}></span>
      </button>

      <AnimateHeight id="open_dropdown_content" duration={300} height={height}>
        <div className={styles.hiddenContent}>
          <div className={styles.hiddenContent_section}>
            <img src={russianFlag} alt="" />
            <p>Ru</p>
            <span className={styles.little_arrow}></span>
          </div>
          <div className={styles.hiddenContent_section}>
            <img src={englishFlag} alt="" />
            <p>En</p>
            <span className={styles.little_arrow}></span>
          </div>
        </div>
      </AnimateHeight>
    </div>
  );
};

export default DropdownLanguage;
