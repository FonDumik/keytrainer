import { FC } from "react";
import ResultDisplay from "shared/ui/ResultDisplay";
import styles from "./styles.module.scss";
import speedImg from "shared/assets/img/speed.svg";
import accuracyImg from "shared/assets/img/accuracy.svg";
import typosImg from "shared/assets/img/typos.svg";
import { useAppSelector } from "shared/hooks/reduxHooks";
import { average } from "../lib/average";

export const HeaderResults: FC = () => {
  const { typos } = useAppSelector((state) => state.InputTextClikClikReducer);
  const { speedArray, accuracy } = useAppSelector(
    (state) => state.headerResultsReducer
  );

  return (
    <div className={styles.container}>
      <ResultDisplay
        imageSrc={speedImg}
        resultValue={average(speedArray)}
        resultPlaceholder="Speed"
      />
      <ResultDisplay
        imageSrc={accuracyImg}
        resultValue={accuracy}
        resultType="%"
        resultPlaceholder="Accuracy"
      />
      <ResultDisplay
        imageSrc={typosImg}
        resultValue={typos}
        resultPlaceholder="Typos"
      />
    </div>
  );
};
