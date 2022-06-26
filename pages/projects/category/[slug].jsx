import Layout from "../../../components/layout/Layout";
import styles from "./../../../styles/ProjectsArchive.module.css";
import TextArrow from "../../../components/TextArrow";
import Link from "next/link";
import { useRouter } from "next/router"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";
import MultimediaGallery from "../../../components/MultimediaGallery"
import { motion } from "framer-motion";
import queries from "../../../api/queries";
import { useEffect, useState } from "react";
import PreloadImg from "../../../public/imagenes/ball-preloader.svg"
import Image from "next/image";
import API_URL from "../../../api/apiUrl";


export default function Slug({ locale, dataMenu }) {
  const [data, setData] = useState(null)
  const [pageLoad, setPageLoad] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const router = useRouter()
  const { t } = useTranslation()

  useEffect(() => {
    const fetchPosts = async () => {
      const categories = await queries.getCategoriesProjects(API_URL, router.locale)
      const projects = await queries.getProjectsByCategory(API_URL, router.locale, router.query.slug)
      setData({
        categories: categories,
        projects: projects
      })
      setLoading(false)
    }

    fetchPosts()
    
    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.on('routeChangeStart', handleStart)
      router.events.on('routeChangeComplete', handleStop)
      router.events.on('routeChangeError', handleStop)
    }
  },[router])

  function handleStart(){
    setPageLoad(true)
  }

  function handleStop(){
    setPageLoad(false)
  }

  if(!data){
    return <p>Error no hay datos</p>
  }
  
  const projects = data.projects.data.categoryProject.translation.projects.nodes
  const categories = data.categories.data.categoriesProject.nodes
  console.log(data)

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
      headerSticky={true}
      footer={true}
      menuData={dataMenu.data}
    >
      <div className={styles.contProjectArchive}>
        <div className="container">
          <div className={styles.contProjectsTop}>
            <div className={styles.contTitle}>
              <h2 className={styles.archiveTitle}>
                {t("projects:our_work")}
              </h2>
            </div>

            {/* Menu Categories */}
            <div className={styles.contCategories}>
              <ul className={styles.contItemsCategories}>
                {categories.map((cat) => {
                  if(cat.count != null && cat.count >=1){
                    return (
                      <li key={cat.slug}>
                        <Link href={`/projects/category/${cat.slug}`}>
                          <a className={router.query.slug==cat.slug ? styles.catActive : ""}>
                            <TextArrow
                              text={cat.name}
                              arrowColor={"var(--s-color)"}
                              fontFamily={"'Libre Caslon Text', serif"}
                            />
                          </a>
                        </Link>
                      </li>
                    )
                  }
                })}
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
              <motion.div key={"grid-projects"} className={styles.gridProjects} initial={'hide'} animate={!isLoading ? 'show' : 'hide'} variants={variants} transition={{delay: 1, duration: 1}}>
                  {projects.map((item) =>(
                    item.featuredImage
                    ?
                    <div key={item.projectId} className={`${styles.gridProjectsItem} ${item.projectFeatures.layout==2 ? styles.gridProjectsItemFeat : item.projectFeatures.layout==3 ? styles.gridProjectsItemVertical : ""} `}>
                      <MultimediaGallery
                        title={item.title}
                        customer={item.projectFeatures.customer}
                        coverImage={item.featuredImage.node.mediaItemUrl}
                        gifImage={item.projectFeatures.featuredGif ? item.projectFeatures.featuredGif.mediaItemUrl : false}
                        link={`/projects/${item.slug}`}
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

// export async function getStaticPaths({ locales }) {
//   if (locales == undefined) {
//     throw new Error('Please define locales in your next.config')
//   }

//   const url_api = "https://www.geniorama.site/demo/amazeinc/graphql"
//   // Query Categories Projects

//   const resJson = await queries.getAllCategoriesProjects(API_URL)
//   const cats = await resJson.data.categoriesProject.edges
//   const paths = flatMap(cats.map((category) => ({ params: { slug: category.node.slug } })), (path) => locales.map(loc => ({ locale: loc, ...path })))
  
//   return {
//     paths,
//     fallback: false
//   }
// }

export async function getServerSideProps({  req, res, locale, params }) {
  try {
    const { slug } = params
    let localeForTranslation

    if (locale == "en-US") {
      localeForTranslation = "EN"
    }

    if (locale == "es-ES") {
      localeForTranslation = "ES"
    }

    // const dataProjects = await queries.getProjectsByCategory(API_URL, localeForTranslation, slug)
    const dataMenu = await queries.getMenuItems(API_URL, localeForTranslation)
    // const dataCategories = await queries.getCategoriesProjects(API_URL, localeForTranslation)

    // const data = {
    //   projects: dataProjects,
    //   categories: dataCategories
    // }

    return {
      props: {
        ...(await serverSideTranslations(locale, ['menu', 'projects'])),
        dataMenu
      }
    }
  } catch (error) {
    return null
  }
}