import { useEffect } from "react";
import { AppsSection } from "features/AppsSection";
import { DocumentationSection } from "features/DocumentationSection";
import styles from "./styles.module.scss";

const StartPage = () => {
  useEffect(() => {
    document.title = "Klavaogr";
    document.querySelector("html").style.backgroundColor = "#dddddd";
  }, []);

  return (
    <div className={styles.startPage}>
      <div className={styles.startPage__wrapper}>
        <DocumentationSection />
        <AppsSection />
        <a href="https://github.com/Cunningham16" className={styles.link}>@Cunningham16</a>
      </div>
    </div>
  );
};

export default StartPage;
