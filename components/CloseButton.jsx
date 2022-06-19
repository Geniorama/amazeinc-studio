import styles from "../styles/CloseButton.module.css"

export default function CloseButton() {
  return (
    <button className={styles.btnClose} role={"button"}>
        <span className={styles.btnCloseLine}></span>
        <span className={styles.btnCloseLine}></span>
    </button>
  )
}
