import Layout from "../../components/layout/Layout";
import Image from "next/image";
import styles from "../../styles/SingleProject.module.css";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import queries from "../../api/queries"
import { flatMap, initial } from "lodash"; 
import { useRouter } from "next/router";
import AOS from "aos";
import 'aos/dist/aos.css'
import { useEffect } from "react";
import { useState } from "react";
import CloseButton from "../../components/CloseButton";
import { motion } from "framer-motion";


export default function SingleProject({ locale, dataMenu, data }) {
  const [imageUrl, setImageUrl] = useState("https://www.geniorama.site/demo/amazeinc/wp-content/uploads/2022/06/3456-scaled.jpg")
  const [isOpenModal, setIsOpenModal] = useState(false)
  const projectData = data.data.project.translation
  const router = useRouter()

  useEffect(()=>{
    AOS.init({
      duration: 1000
    })
  })

  if(router.isFallback){
    <h1 style={{color: "white"}}>Cargando</h1>
  }

  const variantsModal = {
    show: {
      y: 0,
      opacity: 1
    },

    hide: {
      y: "-100%",
      opacity: 0
    }
  }

  function handlerModal(image){
    console.log(image)
    setImageUrl(image)
    setIsOpenModal(true)
  }

  return (
    <Layout 
      header={"secondary"} 
      headerFixed={true}
      headerSticky={true}
      footer={true} 
      menuData={dataMenu.data}  
    >
    {projectData 
    
    ?
    <article id="project-details">
        <div className={styles.imageTop}>
          {projectData.projectFeatures.coverVideo && projectData.projectFeatures.coverImage
            ?
            <video autoPlay loop preload={"true"} muted className={styles.coverVideo} poster={projectData.projectFeatures.coverImage.mediaItemUrl}>
              <source src={projectData.projectFeatures.coverVideo} type="video/mp4"/>
              Your browser does not support the video tag.
            </video>
            :
            projectData.projectFeatures.coverImage
            ?
            <Image 
              src={projectData.projectFeatures.coverImage.mediaItemUrl}
              layout="fill"
              objectFit="cover"
              priority={true}
            />
            :
            ""
          }
          
        </div>

        <section>
          <div className="container">
            {/* Lightbox */}
            <motion.div className={styles.lightbox} initial={"hide"} animate={isOpenModal ? 'show':'hide'} variants={variantsModal} transition={{duration:1}}>
                <div className={styles.contButton} onClick={() => setIsOpenModal(false)}>
                <CloseButton />
                </div>
                <div className={styles.lightboxWrap}>
                  <Image
                    src={imageUrl}
                    layout={"fill"}
                    objectFit="contain"
                  />
                </div>
            </motion.div>
            <div className={styles.infoProject}>
              <div className={styles.infoLeft}>
                <span className={styles.companyName}>{projectData.projectFeatures.customer}</span>
                <span className={styles.projectName}>{projectData.title}</span>
              </div>
              <div className={styles.infoRight}>
                {projectData.content
                  ?
                  <div className={styles.descProject} dangerouslySetInnerHTML={{__html: projectData.content}}/>
                  :
                  ""
                }
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
              <div className={styles.contGallery}>
                {projectData.projectFeatures.gallery
                ?
                projectData.projectFeatures.gallery.map((item) => (
                    <div key={item.id} className={styles.imgLink} onClick={() => handlerModal(item.mediaItemUrl)}>
                      <div className={styles.imgItem} data-aos="fade-up">
                        <Image
                          src={item.mediaItemUrl}
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                    </div>
                ))
                :
                ""
                }
              </div>
          </div>
        </section>
      </article>
    :
    ""
    }
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
  // const paths = flatMap(projects.map((project) => ({ params: { slug: project.slug } })), (path) => locales.map(loc => ({ locale: loc, ...path })))

  let paths = []
  projects.forEach(project => {
    if(project.language != "null" && project.language != undefined){
      if(project.language.locale == "en_US"){
        paths.push({
          params:{
            slug: project.slug
          },
          locale: 'en-US'
        })
      } else if(project.language.locale == "es_ES"){
        paths.push({
          params:{
            slug: project.slug
          },
          locale: 'es-ES'
        })
      }
    }
  });

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ locale, params }) {
  const {slug} = params

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

  if(!data){
    return {notFound: true}
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["menu"])),
      dataMenu,
      data
    }
  }
}
