import React from "react";
import { useAppDispatch, useAppSelector } from "shared/hooks/reduxHooks";
import { CSSTransition } from "react-transition-group";
import "./animation.css";
import styles from "./styles.module.scss";
import {
  toggleCapitalLetters,
  toggleNumbers,
  togglePunctuation,
  toggleShowHints,
  toggleSoundError,
} from "../model";
import Checkbox from "shared/ui/Checkbox";
import { toggleSidebar } from "widgets/SidebarClikClik/model";
import DropdownLanguage from "features/DropdownLang";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const nodeRef = React.useRef<HTMLDivElement | null>(null);
  const { isOpenSidebar, configurationText, configurationKeyboard } =
    useAppSelector((state) => state.sidebarReducer);

  const setSidebar = () => {
    if (isOpenSidebar) {
      dispatch(toggleSidebar());
    }
  };

  return (
    <CSSTransition
      nodeRef={nodeRef}
      classNames="sidebar"
      in={isOpenSidebar}
      timeout={500}
      unmountOnExit
    >
      <div ref={nodeRef} className={styles.container}>
        <div className={styles.close_sidebar} onClick={setSidebar}></div>
        <div className={styles.sidebar}>
          <div className={styles.settings_container}>
            <div className={styles.settings_header}>
              <h3>ADD TO THE LESSON</h3>
            </div>
            <div className={styles.settings_section}>
              <p>Punctuation</p>
              <Checkbox
                checked={configurationText.isPunctuation}
                onClick={() => {
                  dispatch(togglePunctuation());
                }}
              />
            </div>
            <div className={styles.settings_section}>
              <p>Capital letters</p>
              <Checkbox
                checked={configurationText.isCapitalLetters}
                onClick={() => {
                  dispatch(toggleCapitalLetters());
                }}
              />
            </div>
            <div className={styles.settings_section}>
              <p>Numbers</p>
              <Checkbox
                checked={configurationText.isNumbers}
                onClick={() => {
                  dispatch(toggleNumbers());
                }}
              />
            </div>
          </div>
          <div className={styles.settings_container}>
            <div className={styles.settings_header}>
              <h3>SETTINGS</h3>
            </div>
            <div className={styles.settings_section}>
              <p>Language</p>
              <DropdownLanguage />
            </div>
          </div>
          <div className={styles.settings_container}>
            <div className={styles.settings_header}>
              <h3>TYPING SETTINGS</h3>
            </div>
            <div className={styles.settings_section}>
              <p>Show hints</p>
              <Checkbox
                checked={configurationKeyboard.keyHints}
                onClick={() => {
                  dispatch(toggleShowHints());
                }}
              />
            </div>
            <div className={styles.settings_section}>
              <p>Add sound of error?</p>
              <Checkbox
                checked={configurationKeyboard.isSoundError}
                onClick={() => {
                  dispatch(toggleSoundError());
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Sidebar;
