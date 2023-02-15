import { FC } from "react";
import styles from "./styles.module.scss";

interface buttonProps {
  img: string;
  onClick?: () => void;
}

const ButtonClikClik: FC<buttonProps> = ({ img, onClick }) => {
  return (
    <button className={styles.default} onClick={onClick}>
      <img src={img} alt="" />
    </button>
  );
};

export default ButtonClikClik;
