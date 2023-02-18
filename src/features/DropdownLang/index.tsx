import styles from "./styles.module.scss";
import russianFlag from "shared/assets/russia.png";
import englishFlag from "shared/assets/united-kingdom.png";
import AnimateHeight from "react-animate-height";
import { useState } from "react";

type languageConfig = {
  language: string;
  img: string;
};

const arrayLang: languageConfig[] = [
  { language: "Ru", img: russianFlag },
  { language: "En", img: englishFlag },
];

const DropdownLanguage = () => {
  const [height, setHeight] = useState<"auto" | number>(0);
  const [currentLang, setCurrentLang] = useState<languageConfig>({
    language: "Ru",
    img: russianFlag,
  });

  const toggleDropdown = () => {
    return setHeight(height === 0 ? "auto" : 0);
  };

  const selectLang = (elem: languageConfig) => {
    setCurrentLang(elem);
    setHeight(height === 0 ? "auto" : 0);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.major_section}
        aria-controls="open_dropdown_content"
        aria-expanded={height !== 0}
        onClick={toggleDropdown}
      >
        <img src={currentLang.img} alt="" />
        <p>{currentLang.language}</p>
      </button>

      <div className={styles.hiddenContent}>
        <AnimateHeight
          id="open_dropdown_content"
          duration={300}
          height={height}
        >
          {arrayLang.map((elem) => (
            <button
              className={styles.hiddenContent_section}
              onClick={() => {
                selectLang(elem);
              }}
            >
              <img src={elem.img} alt="" />
              <p>{elem.language}</p>
            </button>
          ))}
        </AnimateHeight>
      </div>
    </div>
  );
};

export default DropdownLanguage;
