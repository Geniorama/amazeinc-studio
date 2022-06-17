import Layout from "../../components/layout/Layout";
import Image from "next/image";
import styles from "../../styles/SingleProject.module.css";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import queries from '../api/queries'
import { flatMap } from "lodash";

export default function SingleProject({ locale, dataMenu }) {
  
  return (
    <Layout 
      header={"secondary"} 
      headerFixed={true}
      headerSticky={true}
      footer={true} 
      menuData={dataMenu.data}  
    >
      <article>
        <div className={styles.imageTop}>
          <Image
            src="https://www.geniorama.site/demo/amazeinc/wp-content/uploads/2022/06/1280.jpg"
            layout="fill"
          />
        </div>

        <section>
          <div className="container">
            <div className={styles.infoProject}>
              <div className={styles.infoLeft}>
                <span className={styles.companyName}>Alpina</span>
                <span className={styles.projectName}>AINKAA</span>
              </div>
              <div className={styles.infoRight}>
                <p className={styles.descProject}>
                  Sit lacus, id nunc cras aliquam proin est et vulputate. A,
                  tortor, morbi et amet. Nunc quis sagittis, etiam pharetra non
                  lacus nibh sit. Sit vestibulum dignissim fermentum at. Sit
                  lacus, id nunc cras aliquam proin est et vulputate. A, tortor,
                  morbi et amet. Nunc quis sagittis, etiam pharetra non lacus
                  nibh sit.{" "}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className={styles.contGallery}>
              <div className={styles.imgStyleRight}>
                <div className={styles.imgStyleRightCont}>
                  <Image
                    src="https://www.geniorama.site/demo/amazeinc/wp-content/uploads/2022/06/1280.jpg"
                    width={800}
                    height={500}
                    layout="responsive"
                    objectFit="contain"
                  />
                </div>
              </div>
              <div className={styles.imgStyleLeft}>
                <div className={styles.imgStyleLeftCont}>
                  <Image
                    src="https://www.geniorama.site/demo/amazeinc/wp-content/uploads/2022/06/1280.jpg"
                    width={800}
                    height={500}
                    layout="responsive"
                    objectFit="contain"
                  />
                </div>
              </div>
              <div className={styles.imgStyleDuo}>
                <div className={styles.imgStyleDuoLeft}>
                  <div className={styles.imgStyleDuoLeftCont}>
                    <Image
                      src="https://www.geniorama.site/demo/amazeinc/wp-content/uploads/2022/06/1280.jpg"
                      width={400}
                      height={300}
                      layout="responsive"
                      objectFit="contain"
                    />
                  </div>
                </div>
                <div className={styles.imgStyleDuoRight}>
                  <div className={styles.imgStyleDuoRightCont}>
                    <Image
                      src="https://www.geniorama.site/demo/amazeinc/wp-content/uploads/2022/06/1280.jpg"
                      width={400}
                      height={300}
                      layout="responsive"
                      objectFit="contain"
                    />
                  </div>
                </div>
              </div>
              <div className={styles.imgStyleFull}>
                <div className={styles.imgStyleFullCont}>
                  <Image
                    src="https://www.geniorama.site/demo/amazeinc/wp-content/uploads/2022/06/1280.jpg"
                    width={800}
                    height={500}
                    layout="fill"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
}

export async function getStaticPaths({ locales }) {
  if (locales == undefined) {
    throw new Error('Please define locales in your next.config')
  }

  const url_api = "https://www.geniorama.site/demo/amazeinc/graphql"

  const resJson = await queries.getAllProjects(url_api)
  const projects = resJson.data.projects.nodes
  const paths = flatMap(projects.map((project) => ({ params: { slug: project.slug } })), (path) => locales.map(loc => ({ locale: loc, ...path })))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ locale, params }) {
  
  const url_api = "https://www.geniorama.site/demo/amazeinc/graphql"
  let localeForTranslation

  if (locale == "en-US") {
    localeForTranslation = "EN"
  }

  if (locale == "es-ES") {
    localeForTranslation = "ES"
  }


  const data = await queries.getProjectBySlug(url_api, localeForTranslation, slug)
  const dataMenu = await queries.getMenuItems(url_api, localeForTranslation)

  return {
    props: {
      ...(await serverSideTranslations(locale, ["menu"])),
      dataMenu
    },
  };
}
