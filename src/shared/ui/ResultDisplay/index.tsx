import { FC } from "react";
import styles from "./styles.module.scss";

type resultDisplayProps = {
  imageSrc: string;
  resultValue: string | number;
  resultType?: string;
  resultPlaceholder: string;
};

// In children must be only image
const ResultDisplay: FC<resultDisplayProps> = ({
  imageSrc,
  resultValue,
  resultType,
  resultPlaceholder,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.img_container}>
        <img src={imageSrc} alt="img" />
      </div>
      <div className={styles.result_container}>
        <div className={styles.number}>
          <p className={styles.result}>{resultValue}</p>
          {resultType && <p className={styles.type}>{resultType}</p>}
        </div>
        <p className={styles.placeholder}>{resultPlaceholder}</p>
      </div>
    </div>
  );
};

export default ResultDisplay;
