import Layout from "../components/layout/Layout";
import styles from "../styles/DownloadPortfolios.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
                <a href="#">
                  <li>
                    <span>CAMPAINGS</span>
                  </li>
                </a>
                <a href="#">
                  <li>
                    <span>CAMPAINGS</span>
                  </li>
                </a>
                <a href="#">
                  <li>
                    <span>CAMPAINGS</span>
                  </li>
                </a>
                <a href="#">
                  <li>
                    <span>CAMPAINGS</span>
                  </li>
                </a>
                <a href="#">
                  <li>
                    <span>CAMPAINGS</span>
                  </li>
                </a>
                <a href="#">
                  <li>
                    <span>CAMPAINGS</span>
                  </li>
                </a>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
