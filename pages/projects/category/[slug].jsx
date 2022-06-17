import Layout from "./../../../components/layout/Layout";
import styles from "./../../../styles/ProjectsArchive.module.css";
import TextArrow from "../../../components/TextArrow";
import Link from "next/link";
import { useRouter } from "next/router"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import MultimediaGallery from "../../../components/MultimediaGallery"
import { motion } from "framer-motion";
import { flatMap } from "lodash";
import queries from "../../api/queries";
import { useEffect, useState } from "react";
import PreloadImg from "../../../public/imagenes/ball-preloader.svg"
import Image from "next/image";


export default function Slug({locale, data, dataMenu }) {
  const [pageLoad, setPageLoad] = useState(false)
  const router = useRouter()
  
  if (router.isFallback) {
    return <h1 style={{ color: "white" }}>Cargando</h1>
  } 

  function handleStart(){
    setPageLoad(true)
  }

  function handleStop(){
    setPageLoad(false)
  }

  useEffect(() => {
    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.on('routeChangeStart', handleStart)
      router.events.on('routeChangeComplete', handleStop)
      router.events.on('routeChangeError', handleStop)
    }

  }, [router])

  const projects = data.projects.data.categoryProject.translation.projects.nodes
  const categories = data.categories.data.categoriesProject.nodes

  const variants = {
    show: {
      opacity: 1,
      y: 0
    },

    hide: {
      opacity: 0,
      y: 20
    }
  }

  return (
    <Layout
      title={"AmazeInc Studio"}
      idPage={"amaze-about-us"}
      header={"secondary"}
      headerFixed={true}
      footer={true}
      menuData={dataMenu.data}
    >
      <div className={styles.contProjectArchive}>
        <div className="container">
          <div className={styles.contProjectsTop}>
            <div className={styles.contTitle}>
              <h2>
                OUR<br></br>WORK
              </h2>
            </div>

            {/* Menu Categories */}
            <div className={styles.contCategories}>
              <ul className={styles.contItemsCategories}>
                {categories.map((cat) => (
                  <li key={cat.customSlug.customSlug}>
                    <Link href={`/projects/category/${cat.customSlug.customSlug}`}>
                      <a className={router.query.slug==cat.customSlug.customSlug ? styles.catActive : ""}>
                        <TextArrow
                          text={cat.name}
                          arrowColor={"var(--s-color)"}
                          fontFamily={"'Libre Caslon Text', serif"}
                        />
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            {pageLoad 
              ?
              <motion.div className={styles.contPreload} style={{textAlign: "center", padding: "3rem"}} initial={'show'} animate={!pageLoad ? 'hide' : 'show'} variants={variants}>
                <Image
                  src={PreloadImg}
                  width={300}
                  height={300}
                />
              </motion.div>
              :
              <motion.div key={"grid-projects"} className={styles.gridProjects} initial={'hide'} animate={'show'} variants={variants} transition={{delay: 0, duration: 1}}>
                  {projects.map((item) =>(
                    item.featuredImage
                    ?
                    <div key={item.projectId} className={`${styles.gridProjectsItem} ${item.projectFeatures.layout==2 ? styles.gridProjectsItemFeat : item.projectFeatures.layout==3 ? styles.gridProjectsItemVertical : ""} `}>
                      <MultimediaGallery
                        title={item.title}
                        customer={item.projectFeatures.customer}
                        coverImage={item.featuredImage.node.mediaItemUrl}
                      />
                    </div>
                    :
                    ""
                  ))}
              </motion.div>
            }
          </div>          
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths({ locales }) {
  if (locales == undefined) {
    throw new Error('Please define locales in your next.config')
  }

  const url_api = "https://www.geniorama.site/demo/amazeinc/graphql"
  // Query Categories Projects

  const resJson = await queries.getAllCategoriesProjects(url_api)
  const cats = resJson.data.categoriesProject.edges
  const paths = flatMap(cats.map((category) => ({ params: { slug: category.node.slug } })), (path) => locales.map(loc => ({ locale: loc, ...path })))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ locale, params }) {
  const { slug } = params
  const url_api = "https://www.geniorama.site/demo/amazeinc/graphql"
  let localeForTranslation

  if (locale == "en-US") {
    localeForTranslation = "EN"
  }

  if (locale == "es-ES") {
    localeForTranslation = "ES"
  }

  const resCatsJson = await queries.getCategoriesProjects(url_api, localeForTranslation)
  const dataMenu = await queries.getMenuItems(url_api, localeForTranslation)
  const dataProjects = await queries.getProjectsByCategory(url_api, localeForTranslation, slug)

  const data = {
    categories: resCatsJson,
    projects: dataProjects
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['menu'])),
      data,
      dataMenu
    }
  }
}