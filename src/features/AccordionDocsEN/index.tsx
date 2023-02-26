import { ColumnTextKlavaogrEN } from "entities/ColumnTextKlavaogrEN";
import { Accordion } from "shared/ui/Accordion";
import styles from "./styles.module.scss";

export const AccordionDocsEN = () => {
  return (
    <div className={styles.documentation__section}>
      <Accordion header="Klavaogr">
        <p>
          This is a copy of the klavaorg-delta project, which has limited functionality than the
          original.
        </p>
        <br />
        <p>Once you have loaded the page with trainer, you will no longer need the Internet.</p>
        <ColumnTextKlavaogrEN />
      </Accordion>
      <Accordion header="ClikClik">
        <p>This is a keyboard trainer that is a copy of the popular macOS app KeyKey.</p>
        <br />
        <p>
          Unlike <strong>Klavaogr</strong>, you don't need to use the input field to start your
          workout. Just start typing to start exercising. The method of calculating the speed is
          also different. Now it is almost dynamic, unlike the calculation at the end of the line.
        </p>
        <br />
        <p>
          You can change the difficulty of the workout by including <strong>numbers</strong>,{" "}
          <strong>capital letters</strong>, and <strong>punctuation</strong> in the stroke. You can
          also change the keyboard display options as you wish. To do this, you will need to click
          on the workout settings button (gear in the upper right corner) and select what you like.
        </p>
      </Accordion>
    </div>
  );
};
