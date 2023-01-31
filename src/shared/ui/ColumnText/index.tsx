import styles from "./styles.module.scss";

export const ColumnText = ({ numberList, children }) => {
  return (
    <div className={styles.column}>
      <h1>{`${numberList})`}</h1>
      {children}
    </div>
  );
};
