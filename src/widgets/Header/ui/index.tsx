import { Timer } from "features/Timer";
import styles from "./styles.module.scss";
import { ConfigureTraining } from "features/ConfigureTraining";
import { useAppDispatch, useAppSelector } from "shared/hooks";
import { average, setIsRestart } from "../model";

export const Header = () => {
  const { speed, speedArray, errors, errorsArray, isRestart } = useAppSelector(
    (state) => state.headerReducer
  );
  const dispatch = useAppDispatch();

  function restartTraining() {
    dispatch(setIsRestart(!isRestart));
  }

  return (
    <header>
      <div className="wrapper">
        <div className={styles.header__container}>
          <div className={styles.header__left}>
            <a href="#" className={styles.logo}>
              <img src="./img/logo.png" alt="logo" />
            </a>
            <ConfigureTraining />
            <button
              className={styles.text_reset}
              onClick={restartTraining}
              title="Обновить"
            >
              <img src="./img/restart.png" alt="" width="20px" />
            </button>
          </div>
          <Timer />
          <div className={styles.header__right}>
            <div className={styles.speed}>
              <img src="./img/speed.png" alt="sp" width="20" />
              <p title="Скорость печати / Средняя скорость, симв/мин">
                {`${speed} / ${average(speedArray)}`}
              </p>
            </div>
            <div className={styles.mistakes}>
              <img src="./img/stop.png" alt="" width="20" />
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
