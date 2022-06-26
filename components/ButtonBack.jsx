import Link from "next/link"
import styles from "../styles/ButtonBack.module.css"

export default function ButtonBack() {
  return (
    <Link href={'/projects'}>
        <a className={styles.btnBack}>
          <span className={styles.btnBackArrow}>←</span>
          <span className={styles.btnBackText}>PROJECTS</span>  
        </a>
    </Link>
  )
}
