import styles from './styles.module.scss'

export const PrimaryButton = ({ children, onClick }) => {
  return (
    <button 
      className={styles.button_primary}
      onClick={onClick}
    >
        {children}
    </button>
  )
}