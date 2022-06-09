import Link from "next/link";
import styles from "../styles/MenuPrincipal.module.css"

export default function MenuPrincipal({ handler }) {
  return (
    <div className={styles.menuPrincipal}>
      <div className="container" style={{position: 'relative'}}>
        <button className={styles.btnCloseMenu} onClick={() => handler(false)} role={"button"}>
          <span className={styles.btnCloseMenuLine}></span>
          <span className={styles.btnCloseMenuLine}></span>
        </button>
        <ul className={styles.menuPrincipalList}>
          <li className={styles.menuPrincipalItem}>
            <Link href="#">
              <a className={styles.menuPrincipalLink}>
                <div className={styles.menuPrincipalIndicator}>
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.339283 5.71873C0.00605567 2.74207 2.34688 0.142314 5.34206 0.162572L24.6998 0.293499C29.0131 0.322671 31.268 5.43358 28.3817 8.63904L11.1776 27.7462C8.29141 30.9516 2.9728 29.2434 2.49293 24.9568L0.339283 5.71873Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div>
                  <span className={styles.menuPrincipalTextBottom}>
                    <span className={styles.textArrow}></span>
                    HOME
                  </span>
                </div>
              </a>
            </Link>
          </li>

          <li className={styles.menuPrincipalItem}>
            <Link href="#">
              <a className={styles.menuPrincipalLink}>
                <div className={styles.menuPrincipalIndicator}>
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.339283 5.71873C0.00605567 2.74207 2.34688 0.142314 5.34206 0.162572L24.6998 0.293499C29.0131 0.322671 31.268 5.43358 28.3817 8.63904L11.1776 27.7462C8.29141 30.9516 2.9728 29.2434 2.49293 24.9568L0.339283 5.71873Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div>
                  <span className={styles.menuPrincipalTextTop}>SEE OUR WORK</span>
                  <span className={styles.menuPrincipalTextBottom}>
                    <span className={styles.textArrow}></span>
                    PROJECTS
                  </span>
                </div>
              </a>
            </Link>
          </li>

          <li className={styles.menuPrincipalItem}>
            <Link href="#">
              <a className={styles.menuPrincipalLink}>
                <div className={styles.menuPrincipalIndicator}>
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.339283 5.71873C0.00605567 2.74207 2.34688 0.142314 5.34206 0.162572L24.6998 0.293499C29.0131 0.322671 31.268 5.43358 28.3817 8.63904L11.1776 27.7462C8.29141 30.9516 2.9728 29.2434 2.49293 24.9568L0.339283 5.71873Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div>
                  <span className={styles.menuPrincipalTextTop}>IF YOU LIKE KNOW MORE</span>
                  <span className={styles.menuPrincipalTextBottom}>
                    <span className={styles.textArrow}></span>
                    ABOUT US
                  </span>
                </div>
              </a>
            </Link>
          </li>

          <li className={styles.menuPrincipalItem}>
            <Link href="#">
              <a className={styles.menuPrincipalLink}>
                <div className={styles.menuPrincipalIndicator}>
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.339283 5.71873C0.00605567 2.74207 2.34688 0.142314 5.34206 0.162572L24.6998 0.293499C29.0131 0.322671 31.268 5.43358 28.3817 8.63904L11.1776 27.7462C8.29141 30.9516 2.9728 29.2434 2.49293 24.9568L0.339283 5.71873Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div>
                  <span className={styles.menuPrincipalTextTop}>DOWNLOAD OUR</span>
                  <span className={styles.menuPrincipalTextBottom}>
                    <span className={styles.textArrow}></span>
                    PORTFOLIOS
                  </span>
                </div>
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
