import styles from "./styles.module.scss";
import russianFlag from "shared/assets/russia.png";
import englishFlag from "shared/assets/united-kingdom.png";
import AnimateHeight from "react-animate-height";
import { useState } from "react";
import { useClikDispatch, useClikSelector } from "shared/hooks/ClikClikHooks";
import { changeLanguage } from "widgets/SidebarClikClik/model";

type languageConfig = {
  language: "Ru" | "En";
  img: string;
};

const arrayLang: languageConfig[] = [
  { language: "Ru", img: russianFlag },
  { language: "En", img: englishFlag },
];

const DropdownLanguage = () => {
  const [height, setHeight] = useState<"auto" | number>(0);
  const { configurationKeyboard } = useClikSelector(
    (state) => state.sidebarReducer
  );
  const dispatch = useClikDispatch();

  const setLanguageState = (lang: "Ru" | "En") => {
    if (lang === "Ru") {
      const config: languageConfig = {
        language: "Ru",
        img: russianFlag,
      };
      return config;
    } else if (lang === "En") {
      const config: languageConfig = {
        language: "En",
        img: englishFlag,
      };
      return config;
    }
  };

  const toggleDropdown = () => {
    return setHeight(height === 0 ? "auto" : 0);
  };

  const [currentLang, setCurrentLang] = useState<languageConfig>(
    setLanguageState(configurationKeyboard.language)
  );

  const selectLang = (elem: languageConfig) => {
    setCurrentLang(elem);
    dispatch(changeLanguage(elem.language));
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
