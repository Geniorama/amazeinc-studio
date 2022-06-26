import Link from "next/link";
import styles from "../styles/MenuPrincipal.module.css"
import TextArrow from "./TextArrow";
import { useRouter } from "next/router";

export default function MenuPrincipal({ handler, menuData }) {
  const router = useRouter()
  const menuItems = menuData.mainMenus.nodes
  return (
    <div className={styles.menuPrincipal}>
      <button className={styles.btnCloseMenu} onClick={() => handler(false)} role={"button"}>
        <span className={styles.btnCloseMenuLine}></span>
        <span className={styles.btnCloseMenuLine}></span>
      </button>
      <div className="container" style={{position: 'relative'}}>
        <ul className={styles.menuPrincipalList}>
          {menuItems.map((item) => (
              <li key={item.main_menuId} className={styles.menuPrincipalItem}>
                <Link href={item.mainMenuFeatures.mainSlug} scroll={false}>
                  <a className={`${styles.menuPrincipalLink} ${router.pathname == item.mainMenuFeatures.mainSlug ? styles.active : ""} ${router.pathname.includes('/projects') && item.mainMenuFeatures.mainSlug.includes('/projects') ? styles.active : ""}`}>
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
                      {item.mainMenuFeatures.textLine1 
                      ?
                      <span className={styles.menuPrincipalTextTop}>{item.mainMenuFeatures.textLine1}</span>
                      : 
                      "" 
                      }
                      
                      <span className={styles.menuPrincipalTextBottom}>
                        <span className={styles.textArrow}></span>
                        <TextArrow 
                            text={item.title}
                            arrowColor={"var(--s-color)"}
                            fontFamily={"'Libre Caslon Text', serif"}
                        />
                      </span>
                    </div>
                  </a>
                </Link>
              </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
