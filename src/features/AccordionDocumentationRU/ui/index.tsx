import { ColumnTextKlavaogrRU } from "entities/ColumnTextKlavaogrRU";
import { Accordion } from "shared/ui/Accordion";
import styles from "./styles.module.scss";

export const AccordionDocumentationRU = () => {
  return (
    <div className={styles.documentation__section}>
      <Accordion header="Klavaogr">
        <p>
          Это клавиатурный тренажёр. На основе различных текстов, песен, их
          переводов, книг, книг с переводами, субтитров к фильмам на разных
          языках, можно приготовить себе качественные учебные материалы.
        </p>
        <br />
        <p>В течение всего времени обучения доступ к интернету не требуется.</p>
        <ColumnTextKlavaogrRU />
      </Accordion>
    </div>
  );
};
