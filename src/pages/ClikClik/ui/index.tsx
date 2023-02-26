import React from "react";
import { Provider } from "react-redux";
import { HeaderResults } from "widgets/HeaderResults";
import { InputTextClikClik } from "widgets/InputTextClikClik";
import InteractableKeyboard from "widgets/InteractableKeyboard";
import { store } from "shared/store";
import styles from "./styles.module.scss";
import { ButtonsWidget } from "features/ButtonsWidget";
import { SidebarClicClik } from "widgets/SidebarClikClik";

const ClikClik = () => {
  React.useEffect(() => {
    document.title = "ClikClik";
    document.querySelector("html").style.backgroundColor = "#131217";
  }, []);

  return (
    <Provider store={store}>
      <div className={styles.container}>
        <HeaderResults />
        <InputTextClikClik />
        <InteractableKeyboard />
        <ButtonsWidget />
        <SidebarClicClik />
      </div>
    </Provider>
  );
};

export default ClikClik;
