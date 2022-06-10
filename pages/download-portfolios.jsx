import Layout from "../components/layout/Layout";
import styles from "../styles/DownloadPortfolios.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

export default function DownloadPortfolios() {
  return (
    <Layout
      title={"AmazeInc Studio"}
      idPage={"amaze-download"}
      header={"principal"}
      headerFixed={true}
      footer={true}
    >
      <div className={styles.contPortfolios}>
        <div className="container">
          <div className={styles.contGeneral}>
            <div className={styles.contTitle}>
              <h2 className={styles.title}>PORTFOLIOS</h2>
            </div>
            <div className={styles.contItems}>
              <ul>
                <li>
                  <a href="#">
                    <span className={styles.contIcon}>
                      <FontAwesomeIcon icon={faDownload}/>
                    </span>
                    <span>CAMPAINGS</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className={styles.contIcon}>
                      <FontAwesomeIcon icon={faDownload}/>
                    </span>
                    <span>LIFESTYLE</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className={styles.contIcon}>
                      <FontAwesomeIcon icon={faDownload}/>
                    </span>
                    <span>CARS</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className={styles.contIcon}>
                      <FontAwesomeIcon icon={faDownload}/>
                    </span>
                    <span>PORTRAITS</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className={styles.contIcon}>
                      <FontAwesomeIcon icon={faDownload}/>
                    </span>
                    <span>PRODUCT</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className={styles.contIcon}>
                      <FontAwesomeIcon icon={faDownload}/>
                    </span>
                    <span>FASHION</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
