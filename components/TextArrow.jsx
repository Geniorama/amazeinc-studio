import styles from "../styles/TextArrow.module.css"

export default function TextArrow({text, fontSize, fontFamily, fontColor, arrowColor}) {
  return (
    <div className={styles.textArrow}>
       <span className={styles.arrow} style={{background: arrowColor, "--backgroundBefore": arrowColor}}></span>
       <span className={styles.text} style={{fontSize, fontFamily, color: fontColor, margin: 0}}>{text}</span>
    </div>
  )
}
