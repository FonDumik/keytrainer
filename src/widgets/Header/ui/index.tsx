import { Timer } from "features/Timer";
import styles from "./styles.module.scss";
import { ConfigureTraining } from "features/ConfigureTraining";
import { useKlavaogrDispatch, useKlavaogrSelector } from "shared/hooks";
import { average, setIsRestart } from "../model";

import logoImg from "shared/assets/logo.png";
import speedImg from "shared/assets/speed.png";
import restartImg from "shared/assets/restart.png";
import stopImg from "shared/assets/stop.png";

export const Header = () => {
  const { speed, speedArray, errors, errorsArray, isRestart } =
    useKlavaogrSelector((state) => state.headerReducer);
  const dispatch = useKlavaogrDispatch();

  function restartTraining() {
    dispatch(setIsRestart(!isRestart));
  }

  return (
    <header>
      <div className="wrapper">
        <div className={styles.header__container}>
          <div className={styles.header__left}>
            <a href="#" className={styles.logo}>
              <img src={logoImg} alt="logo" />
            </a>
            <ConfigureTraining />
            <button
              className={styles.text_reset}
              onClick={restartTraining}
              title="Обновить"
            >
              <img src={restartImg} alt="" width="20px" />
            </button>
          </div>
          <Timer />
          <div className={styles.header__right}>
            <div className={styles.speed}>
              <img src={speedImg} alt="sp" width="20" />
              <p title="Скорость печати / Средняя скорость, симв/мин">
                {`${speed} / ${average(speedArray)}`}
              </p>
            </div>
            <div className={styles.mistakes}>
              <img src={stopImg} alt="" width="20" />
              <p title="Число ошибок / Среднее число ошибок">
                {`${errors} / ${average(errorsArray)}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
