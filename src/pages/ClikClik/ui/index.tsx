import React from "react";
import { Provider } from "react-redux";
import HeaderResults from "widgets/HeaderResults/ui";
import { InputTextClikClik } from "widgets/InputTextClikClik";
import InteractableKeyboard from "widgets/InteractableKeyboard/ui";
import { storeClikClik } from "../model";
import styles from "./styles.module.scss";

const ClikClik = () => {
  React.useEffect(() => {
    document.title = "ClikClik";
    document.querySelector("html").style.backgroundColor = "#474448";
  }, []);

  return (
    <Provider store={storeClikClik}>
      <div className={styles.container}>
        <HeaderResults />
        <InputTextClikClik />
        <InteractableKeyboard />
      </div>
    </Provider>
  );
};

export default ClikClik;
