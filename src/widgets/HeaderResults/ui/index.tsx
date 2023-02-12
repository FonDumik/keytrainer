import { FC } from "react";
import ResultDisplay from "shared/ui/ResultDisplay";
import styles from "./styles.module.scss";
import speedImg from "shared/assets/speed.svg";
import accuracyImg from "shared/assets/accuracy.svg";
import typosImg from "shared/assets/typos.svg";
import { useClikSelector } from "shared/hooks/ClikClikHooks";
import { average } from "../lib/average";

export const HeaderResults: FC = () => {
  const { typos } = useClikSelector((state) => state.InputTextClikClikReducer);
  const { speedArray, accuracy } = useClikSelector(
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
