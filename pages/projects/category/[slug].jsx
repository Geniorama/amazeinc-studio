import Layout from "../../../components/layout/Layout";
import styles from "./../../../styles/ProjectsArchive.module.css";
import TextArrow from "../../../components/TextArrow";
import Link from "next/link";
import { useRouter } from "next/router"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";
import MultimediaGallery from "../../../components/MultimediaGallery"
import { motion, AnimatePresence } from "framer-motion";
import queries from "../../../api/queries";
import { useEffect, useState } from "react";
import PreloadImg from "../../../public/imagenes/ball-preloader.svg"
import Image from "next/image";
import API_URL from "../../../api/apiUrl";
import { localeCovert } from "../../../helpers";
import PreloadPages from "../../../components/PreloadPages";


export default function Slug({ dataMenu }) {
  const [data, setData] = useState(null)
  const [pageLoad, setPageLoad] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const router = useRouter()
  const { t } = useTranslation()

  useEffect(() => {
    const fetchPosts = async () => {
      const categories = await queries.getCategoriesProjects(API_URL, localeCovert(router.locale))
      const projects = await queries.getProjectsByCategory(API_URL, localeCovert(router.locale), router.query.slug)
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

  const variants = {
    show: {
      opacity: 1,
      y: 0
    },

    hide: {
      opacity: 0,
      y: 50
    }
  }

  return (
    <>
      <PreloadPages theme={"dark"} trigger={data}/>
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
              {data
                ?
                <div className={styles.contCategories}>
                  <ul className={styles.contItemsCategories}>
                    {data.categories.data.categoriesProject.nodes.map((cat) => {
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
                :
                ""
              }
            </div>

            <div>

              {data
              ?
              pageLoad
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
                  {data.projects.data.categoryProject.translation.projects.nodes.map((item) =>(
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
              :
              ""
              }
            </div>          
          </div>
        </div>
      </Layout>
    </>
  )
}

export async function getServerSideProps({ locale }) {
  try {
    const dataMenu = await queries.getMenuItems(API_URL, localeCovert(locale))
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