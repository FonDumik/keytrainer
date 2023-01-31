import styles from "./styles.module.scss";
interface PrimaryButtonProps {
  children: any;
  onClick?: any;
  styleSheet: string;
}

export const PrimaryButton = ({
  children,
  onClick,
  styleSheet,
}: PrimaryButtonProps) => {
  const configureButton = () => {
    if (styleSheet === "primary") {
      return styles.button_primary;
    } else if (styleSheet === "home") {
      return styles.button_home;
    } else if (styleSheet === "menu") {
      return styles.button_menu;
    }
  };

  return (
    <button className={configureButton()} onClick={onClick}>
      {children}
    </button>
  );
};
