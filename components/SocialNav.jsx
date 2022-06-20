import styles from "../styles/SocialNav.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export default function SocialNav() {
  return (
    <ul className={styles.socialNav}>
      {/* Item youtube */}
      {/* <li className={styles.socialNavItem}>
        <a href="" className={styles.socialNavLink}>
          <span className={styles.socialNavIcon}>
            <FontAwesomeIcon icon={faYoutube} />
          </span>
        </a>
      </li> */}

      {/* Item Instagram */}
      <li className={styles.socialNavItem}>
        <a href="https://www.instagram.com/amazeinc_studio/" target={"_blank"} rel="noreferrer" className={styles.socialNavLink}>
          <span className={styles.socialNavIcon}>
            <FontAwesomeIcon icon={faInstagram}/>
          </span>
        </a>
      </li>

      {/* Item whatsapp */}
      <li className={styles.socialNavItem}>
        <a href="https://wa.link/5u46ma" className={styles.socialNavLink} target="_blank" rel="noreferrer">
        <span className={styles.socialNavIcon}>
            <FontAwesomeIcon icon={faWhatsapp}/>
          </span>
        </a>
      </li>
    </ul>
  );
}
