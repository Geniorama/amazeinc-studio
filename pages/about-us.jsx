import styles from "./../styles/AboutUs.module.css";
import Layout from "../components/layout/Layout";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";
import queries from "../api/queries";

export default function AboutUs({locale, data, dataMenu}) {
  const { t } = useTranslation()
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
  const url_api = "https://www.geniorama.site/demo/amazeinc/graphql"
  let localeForTranslation

  if(locale == "en-US"){
   localeForTranslation = "EN"
  }

  if(locale == "es-ES"){
   localeForTranslation = "ES"
  }


  const data = await queries.getDataAboutUs(url_api, localeForTranslation)
  const dataMenu = await queries.getMenuItems(url_api, localeForTranslation)

  return {
    props: {
        ...(await serverSideTranslations(locale, ['menu'])),
        data,
        dataMenu
    }
  }
}
