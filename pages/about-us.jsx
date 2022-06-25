import styles from "./../styles/AboutUs.module.css";
import Layout from "../components/layout/Layout";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";
import queries from "../api/queries";
import API_URL from "../api/apiUrl";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PreloadPages from "../components/PreloadPages";

export default function AboutUs({locale, dataMenu, localeForTranslation}) {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const { t } = useTranslation()
  const router = useRouter()

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await queries.getDataAboutUs(API_URL, localeForTranslation)
      setData(res)
      setTimeout(()=>{
        setLoading(false)
      }, 3000)
    }

    fetchPosts()
  },[])

  if(isLoading) return (
    <PreloadPages theme={'light'} isLoading={isLoading} />
  )
  if (!data) return <p>No profile data</p>
  
  const innerHTML = data.data.pageBy.translation.content
  return (
    <Layout
      title={"AmazeInc Studio"}
      idPage={"amaze-about-us"}
      header={"secondary"}
      headerSticky={true}
      footer={true}
      translate={t}
      menuData={dataMenu.data}
    >
      <div className={styles.contAbout}>
        {/* Arrow */}
        {/* <span className={styles.aboutArrow}></span> */}
        <div className="container">
          <div className={styles.contentAbout}>
            <h2 className={styles.titleAbout}>
              {data.data.pageBy.translation.title}
            </h2>
            <div className={styles.textAbout}>
              <div dangerouslySetInnerHTML={{ __html: innerHTML }} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}


export async function getStaticProps({locale}){
  try {
    let localeForTranslation

    if(locale == "en-US"){
    localeForTranslation = "EN"
    }

    if(locale == "es-ES"){
    localeForTranslation = "ES"
    }

    const dataMenu = await queries.getMenuItems(API_URL, localeForTranslation)

    return {
      props: {
          ...(await serverSideTranslations(locale, ['menu'])),
          dataMenu,
          localeForTranslation
      }
    }
  } catch (error) {
    return null
  }
}
