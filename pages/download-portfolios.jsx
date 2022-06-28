import Layout from "../components/layout/Layout";
import styles from "../styles/DownloadPortfolios.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";
import queries from "../api/queries";
import API_URL from "../api/apiUrl";
import { useState, useEffect } from "react";
import { localeCovert } from "../helpers";
import { useRouter } from "next/router";
import PreloadPages from "../components/PreloadPages";

export default function DownloadPortfolios({dataMenu}) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true)
  const router = useRouter()
  const { t } = useTranslation()

  useEffect(() => {
    const fetchData = async () => {
      const res = await queries.getAllPortfolios(API_URL, localeCovert(router.locale))
      setData(res)
      setLoading(false)
    }
    fetchData()
  }, [router])
  
  return (
    <>
      <PreloadPages theme={"dark"} trigger={data}/>
      <Layout
        title={"AmazeInc Studio"}
        idPage={"amaze-download"}
        header={"secondary"}
        headerSticky={true}
        footer={true}
        menuData={dataMenu.data}
      >

        {data  
        ?
        <div className={styles.contPortfolios}>
          <div className="container">
            <div className={styles.contGeneral}>
              <div className={styles.contTitle}>
                <h2 className={styles.title}>{t('portfolios:portfolios')}</h2>
              </div>
              <div className={styles.contItems}>
                <ul>
                  {data.data.portfolios.nodes.map((item) => (
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
        :
        ""
        }
        
      </Layout>
    </>
    
  );
}

export async function getStaticProps({locale}){
  try {
    const dataMenu = await queries.getMenuItems(API_URL, localeCovert(locale))

    return {
      props: {
          ...(await serverSideTranslations(locale, ['menu', 'portfolios'])),
          dataMenu
      }
    }
    
  } catch (error) {
    console.log(error)
    return null
  }
}

