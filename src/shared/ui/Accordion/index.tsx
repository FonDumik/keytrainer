import { PrimaryButton } from "shared/ui/PrimaryButton";
import styles from "./styles.module.scss";
import { useState } from "react";
import AnimateHeight from "react-animate-height";
import arrowImg from "shared/assets/chevron-down.svg";

export const Accordion = ({ children, header }) => {
  const [styleImg, setStyleImg] = useState(styles.button__img);
  const [height, setHeight] = useState<"auto" | number>(0);

  const toggleContent = () => {
    if (height === 0) {
      setStyleImg(styles.button__img_active);
    } else {
      setStyleImg(styles.button__img);
    }
    return setHeight(height === 0 ? "auto" : 0);
  };

  return (
    <div className={styles.accordion}>
      <div className={styles.accordion__header}>
        <h1>{header}</h1>
        <PrimaryButton
          styleSheet="primary"
          aria-expanded={height !== 0}
          aria-controls="open_accordion_content"
          onClick={toggleContent}
        >
          <img src={arrowImg} alt="" className={styleImg} />
        </PrimaryButton>
      </div>

      <AnimateHeight id="open_accordion_content" duration={300} height={height}>
        <div className={styles.accordion__content}>{children}</div>
      </AnimateHeight>
    </div>
  );
};
