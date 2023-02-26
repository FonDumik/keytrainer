import { ColumnText } from "shared/ui/ColumnText";
import styles from "./styles.module.scss";

export const ColumnTextKlavaogrEN = () => {
  return (
    <div className={styles.text__grid}>
      <ColumnText numberList={1}>
        <p>
          First, print a desktop keyboard for yourself, where you need to put your fingers, and
          which button you need to press with your finger, and look at it, not at your keyboard:{" "}
          <a href="https://klava.org/static/keyboard-ru.pdf">keyboard-ru.pdf</a>
        </p>
        <p>
          If you have a non-standard layout or finger areas, then you can write in your own blank
          templates yourself, or paint the finger areas with colored markers.
        </p>
        <p>
          The source file in SVG format is available (you can work with it using the vector editor
          Inkscape), where there are other options for keyboards and finger zones:{" "}
          <a href="https://klava.org/static/keyboard.svg">keyboard.svg</a>
        </p>
      </ColumnText>
      <ColumnText numberList={2}>
        <p>
          Add yourself a dictionary composed of the most commonly used words, for this click on this
          link:{" "}
          <a href="https://klava.org/share?d=9&k=ComJvRfVQ3">
            https://klava.org/share?d=9&k=ComJvRfVQ3
          </a>{" "}
          , and the dictionary will appear in your list.
        </p>
      </ColumnText>
      <ColumnText numberList={3}>
        <p>
          Sit straight, put your hands on the keyboard, each finger should be located above the
          button indicated on the diagram. Initially, you will be asked to type the same word many
          times. At the beginning of the line, determine which fingers to press. By the end of the
          line, you must press the buttons automatically, without looking at the prompt.
        </p>
        <p>
          To get rid of the habit of spying on the keyboard, try to look at the diagram if you
          forgot where the right button is located.
        </p>
        <p>
          Initially, you will be asked to type the same word many times. At the beginning of the
          line, determine which fingers to press. By the end of the line, you must press the buttons
          automatically, without looking at the prompt.
        </p>
      </ColumnText>
      <ColumnText numberList={4}>
        <p>
          After some time of training, the dictionary will automatically switch to the generation of
          texts based on the dictionary of frequency words, in this mode there is already training
          the printing speed.
        </p>
        <p>
          It is recommended to use this dictionary in the future, before typing other texts to
          accelerate to its maximum speed.
        </p>
      </ColumnText>
    </div>
  );
};
