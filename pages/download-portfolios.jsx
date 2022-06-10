import Layout from "../components/layout/Layout";
import styles from "../styles/DownloadPortfolios.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";

export default function DownloadPortfolios(props) {
  const { t } = useTranslation()
  return (
    <Layout
      title={"AmazeInc Studio"}
      idPage={"amaze-download"}
      header={"principal"}
      headerFixed={true}
      footer={true}
      translate={t}
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

export async function getStaticProps({locale}){
  return {
    props: {
        ...(await serverSideTranslations(locale, ['menu'])) 
    }
  }
}

