import { ColumnTextKlavaogrRU } from "entities/ColumnTextKlavaogrRU";
import { Accordion } from "shared/ui/Accordion";
import styles from "./styles.module.scss";

export const AccordionDocumentationRU = () => {
  return (
    <div className={styles.documentation__section}>
      <Accordion header="Klavaogr">
        <p>
          Это копия проекта klavaorg-delta, которая имеет ограниченную функциональность, в отличии
          от оригинала.
        </p>
        <br />
        <p>Как только вы загрузили страницу с тренажером, вам более не пригодится интернет.</p>
        <ColumnTextKlavaogrRU />
      </Accordion>
      <Accordion header="ClikClik">
        <p>
          Это клавиатурный тренажер, который является копией популярного приложения на MacOS KeyKey.
        </p>
        <br />
        <p>
          В отличии от <strong>Klavaogr</strong> вам не нужно использовать поле ввода для начала
          тренировки. Просто начните печатать, чтобы начать тренироваться. Также отличается методика
          расчета скорости. Теперь она почти динамическая, в отличии от расчета в конце строки.
        </p>
        <br />
        <p>
          Вы можете изменить сложность тренироки, включив в строку <strong>цифры</strong>,{" "}
          <strong>заглавные буквы</strong>, а также <strong>пунктуацию</strong>. Также вы можете
          изменить параметры отображения клавиатуры по своему желанию. Для этого вам нужно будет
          нажать на кнопку настройки тренировки (шестеренка в верхнем правом углу) и выбрать то, что
          вашей дуще угодно.
        </p>
      </Accordion>
    </div>
  );
};
