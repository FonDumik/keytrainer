import { useEffect } from "react";
import { AppsSection } from "widgets/AppsSection";
import { DocumentationSection } from "widgets/DocumentationSection";
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
      </div>
    </div>
  );
};

export default StartPage;
