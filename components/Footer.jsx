import Link from "next/link";
import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.containerFooter}>
      <div className="container">
        <div className={styles.conTextFooter}>
          <span className={styles.textFooter}>Amaze Inc 2022 | All rights reserved ®</span>
          <span className={styles.textFooter}>
            Powered by
            <a href="https://geniorama.co" target={"_blank"} rel="noreferrer" className={styles.amazeWebLink}> Geniorama</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
