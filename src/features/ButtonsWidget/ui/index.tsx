import ButtonClikClik from "shared/ui/ButtonClikClik";
import styles from "./styles.module.scss";
import settingsImg from "shared/assets/img/gear-fill.svg";
import returnImg from "shared/assets/img/arrow-left.svg";
import { Link } from "react-router-dom";
import { toggleSidebar } from "widgets/SidebarClikClik/model";
import { useAppDispatch } from "shared/hooks/reduxHooks";

export const ButtonsWidget = () => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.container}>
      <Link to="/">
        <ButtonClikClik img={returnImg} />
      </Link>
      <ButtonClikClik
        img={settingsImg}
        onClick={() => dispatch(toggleSidebar(true))}
      />
    </div>
  );
};
