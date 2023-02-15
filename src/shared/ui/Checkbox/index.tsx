import styles from "./styles.module.scss";

interface checkboxProps {
  checked: boolean;
  onClick: React.MouseEventHandler<HTMLInputElement>;
}

const Checkbox = ({ checked, onClick }: checkboxProps) => {
  return (
    <label className={styles.container}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={checked}
        onClick={onClick}
      />
      <span className={styles.label}></span>
    </label>
  );
};

export default Checkbox;
