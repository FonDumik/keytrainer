import React from "react";
import { Provider } from "react-redux";
import { HeaderResults } from "widgets/HeaderResults";
import { InputTextClikClik } from "widgets/InputTextClikClik";
import InteractableKeyboard from "widgets/InteractableKeyboard";
import { storeClikClik } from "../model";
import styles from "./styles.module.scss";
import { ButtonsWidget } from "widgets/ButtonsWidget";

const ClikClik = () => {
  React.useEffect(() => {
    document.title = "ClikClik";
    document.querySelector("html").style.backgroundColor = "#131217";
  }, []);

  return (
    <Provider store={storeClikClik}>
      <div className={styles.container}>
        <HeaderResults />
        <InputTextClikClik />
        <InteractableKeyboard />
        <ButtonsWidget />
      </div>
    </Provider>
  );
};

export default ClikClik;
