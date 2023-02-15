import ButtonClikClik from "shared/ui/ButtonClikClik";
import styles from "./styles.module.scss";
import settingsImg from "shared/assets/gear-fill.svg";
import returnImg from "shared/assets/arrow-left.svg";
import { Link } from "react-router-dom";
import { toggleSidebar } from "widgets/SidebarClikClik/model";
import { useClikDispatch } from "shared/hooks/ClikClikHooks";
import Sidebar from "widgets/SidebarClikClik/ui";

export const ButtonsWidget = () => {
  const dispatch = useClikDispatch();
  return (
    <div className={styles.container}>
      <Link to="/">
        <ButtonClikClik img={returnImg} />
      </Link>
      <ButtonClikClik
        img={settingsImg}
        onClick={() => dispatch(toggleSidebar(true))}
      />
      <Sidebar />
    </div>
  );
};
