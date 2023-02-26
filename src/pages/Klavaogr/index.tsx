import { useEffect } from "react";
import { Provider } from "react-redux";

import { Header } from "widgets/Header";
import { InputText } from "widgets/InputText";
import Keyboard from "widgets/Keyboard";

import { store } from "shared/store";
import styles from "./styles.module.scss";

const Klavaogr = () => {
  useEffect(() => {
    document.title = "Klavaogr | Клавиатурный тренажер";
    document.querySelector("html").style.backgroundColor = "#ffffff";
  }, []);

  return (
    <Provider store={store}>
      <div className={styles.MainPage}>
        <Header />
        <InputText />
        <Keyboard />
      </div>
    </Provider>
  );
};

export default Klavaogr;
