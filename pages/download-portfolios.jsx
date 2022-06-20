import Layout from "../components/layout/Layout";
import styles from "../styles/DownloadPortfolios.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";
import queries from "../api/queries";

export default function DownloadPortfolios({locale, dataMenu, data}) {
  const portfolios = data.data.portfolios.nodes
  const { t } = useTranslation()
  return (
    <Layout
      title={"AmazeInc Studio"}
      idPage={"amaze-download"}
      header={"secondary"}
      headerSticky={true}
      footer={true}
      menuData={dataMenu.data}
    >
      <div className={styles.contPortfolios}>
        <div className="container">
          <div className={styles.contGeneral}>
            <div className={styles.contTitle}>
              <h2 className={styles.title}>{t('portfolios:portfolios')}</h2>
            </div>
            <div className={styles.contItems}>
              <ul>
                {portfolios.map((item) => (
                    item.downloads.file.mediaItemUrl
                    ?
                    <li key={item.portfolioId}>
                      <a href={item.downloads.file.mediaItemUrl} target="_blank" rel="noreferrer" download={item.title}>
                        <span className={styles.contIcon}>
                          <FontAwesomeIcon icon={faDownload}/>
                        </span>
                        <span>{item.title}</span>
                      </a>
                    </li>
                    :
                    ""
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({locale}){
  const url_api = "https://www.geniorama.site/demo/amazeinc/graphql"
  let localeForTranslation

  if (locale == "en-US") {
    localeForTranslation = "EN"
  }

  if (locale == "es-ES") {
    localeForTranslation = "ES"
  }

  const dataMenu = await queries.getMenuItems(url_api, localeForTranslation)
  const data = await queries.getAllPortfolios(url_api, localeForTranslation)

  return {
    props: {
        ...(await serverSideTranslations(locale, ['menu', 'portfolios'])),
        data,
        dataMenu
    }
  }
}

