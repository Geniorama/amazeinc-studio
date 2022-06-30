import styles from "./../styles/AboutUs.module.css";
import Layout from "../components/layout/Layout";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";
import queries from "../api/queries";
import API_URL from "../api/apiUrl";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { localeCovert } from "../helpers";
import PreloadPages from "../components/PreloadPages";

export default function AboutUs({dataMenu, data}) {
  // const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const { t } = useTranslation()
  const router = useRouter()

  useEffect(() => {
    if(data){
      setLoading(false)
    }
  },[data])
  
  return (
    <>
      <PreloadPages theme={"dark"} trigger={data}/>
      <Layout
      title={"AmazeInc Studio"}
      idPage={"amaze-about-us"}
      header={"secondary"}
      headerSticky={true}
      footer={true}
      translate={t}
      menuData={dataMenu.data}
    >

      {data
      ?
      <div className={styles.contAbout}>
        {/* Arrow */}
        {/* <span className={styles.aboutArrow}></span> */}
        <div className="container">
          <div className={styles.contentAbout}>
            <h2 className={styles.titleAbout}>
              {data.data.pageBy.translation.title}
            </h2>
            <div className={styles.textAbout}>
              <div dangerouslySetInnerHTML={{ __html: data.data.pageBy.translation.content }} />
            </div>
          </div>
        </div>
      </div>
      :
      <p>Data not found</p>
      }
      
    </Layout>
    </>
  );
}


export async function getStaticProps({locale}){
  try {
    const dataMenu = await queries.getMenuItems(API_URL, localeCovert(locale))
    const data = await queries.getDataAboutUs(API_URL, localeCovert(locale))

    return {
      props: {
          ...(await serverSideTranslations(locale, ['menu'])),
          dataMenu,
          data

      }
    }
  } catch (error) {
    return null
  }
}
