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
            <Link href="#">
              <a className={styles.amazeWebLink}>Geniorama</a>
            </Link>{" "}
          </span>
        </div>
      </div>
    </footer>
  );
}
