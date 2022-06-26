import Layout from "../../components/layout/Layout";
import Image from "next/image";
import styles from "../../styles/SingleProject.module.css";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import queries from "../../api/queries"
import { useRouter } from "next/router";
import AOS from "aos";
import 'aos/dist/aos.css'
import { useEffect } from "react";
import { useState } from "react";
import CloseButton from "../../components/CloseButton";
import { motion } from "framer-motion";
import API_URL from "../../api/apiUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightAndDownLeftFromCenter, faAngleDown} from "@fortawesome/free-solid-svg-icons";
import ButtonBack from "../../components/ButtonBack";
import { localeCovert } from "../../helpers";


export default function SingleProject({ dataMenu }) {
  const [imageUrl, setImageUrl] = useState("https://www.geniorama.site/demo/amazeinc/wp-content/uploads/2022/06/3456-scaled.jpg")
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  
  const router = useRouter()

  useEffect(()=>{
    const fetchPosts = async () => {
      const projects = await queries.getProjectBySlug(API_URL, localeCovert(router.locale) , router.query.slug)
      setData(projects)
      setLoading(false)
    }

    fetchPosts()
    AOS.init({
      duration: 1000
    })
  })

  if(!data){
    return <p>Data not found</p>
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
    setImageUrl(image)
    setIsOpenModal(true)
  }

  const projectData = data.data.project.translation
  let videoArr = []

  if(projectData.projectFeatures.galleryVideo){
    videoArr = (projectData.projectFeatures.galleryVideo).split(',')
  }

  let countGallery = 0

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
          <span className={styles.moreContent}>
              <p className={styles.moreContentText}>
                {router.locale == "en-US"
                  ?
                  "SEE MORE"
                  :
                  "VER MÁS"
                }
              </p>
              <FontAwesomeIcon icon={faAngleDown} />
          </span>
        </div>

        <section>
          <div className="container">
            {/* Lightbox */}
            <motion.div className={styles.lightbox} initial={"hide"} animate={isOpenModal ? 'show':'hide'} variants={variantsModal} transition={{duration:1}}>
                <div className={styles.lightboxWrap}>
                  <div className={styles.lightboxContent}>
                    <div className={styles.contButton} onClick={() => setIsOpenModal(false)}>
                      <CloseButton />
                    </div>
                    <img src={imageUrl} alt="" className={styles.imgLightbox} />
                  </div>
                </div>
            </motion.div>
            <div className={styles.infoProject}>
              <div className={styles.infoLeft} data-aos="fade-right">
                <span className={styles.companyName}>{projectData.projectFeatures.customer}</span>
                <span className={styles.projectName}>{projectData.title}</span>
                {projectData.content
                  ?
                  <div className={styles.descProject} dangerouslySetInnerHTML={{__html: projectData.content}}/>
                  :
                  ""
                }
              </div>
              <div className={styles.infoRight}>
                {/* Not found */}
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
                    <div key={item.id} className={styles.imgLink} data-aos="fade-up">
                      <div className={styles.imgWrap} onClick={() => handlerModal(item.mediaItemUrl)} >
                        <div className={styles.imgItem}>
                          <img src={item.mediaItemUrl} alt="" className={styles.imgGallery}/>
                        </div>
                        <div className={styles.iconExpand}>
                          <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} size={"sm"} />
                        </div>
                      </div>
                    </div>
                ))
                :
                ""
                }

                {projectData.projectFeatures.galleryVideo
                  ?
                  videoArr.map((item) =>{
                    countGallery++
                    return(
                      <div key={countGallery} className={styles.videoLink} data-aos="fade-up">
                        <video src={item} controls className={styles.videoItemGallery}></video>
                      </div>
                    )
                  })
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

      <ButtonBack />
    </Layout>
  );
}

// export async function getStaticPaths({ locales }) {
//   if (locales == undefined) {
//     throw new Error('Please define locales in your next.config')
//   }

//   const resJson = await queries.getAllProjects(API_URL)
//   const projects = resJson.data.projects.nodes

//   let paths = []
//   projects.forEach(project => {
//     if(project.language != "null" && project.language != undefined){
//       if(project.language.locale == "en_US"){
//         paths.push({
//           params:{
//             slug: project.slug
//           },
//           locale: 'en-US'
//         })
//       } else if(project.language.locale == "es_ES"){
//         paths.push({
//           params:{
//             slug: project.slug
//           },
//           locale: 'es-ES'
//         })
//       }
//     }
//   });

//   return {
//     paths,
//     fallback: false
//   }
// }

export async function getServerSideProps({ locale }) {
  try {

    // const data = await queries.getProjectBySlug(API_URL, localeCovert(locale) , slug)
    const dataMenu = await queries.getMenuItems(API_URL, localeCovert(locale))

    return {
      props: {
        ...(await serverSideTranslations(locale, ["menu"])),
        dataMenu
      }
    }
    
  } catch (error) {
    console.log(error)
    return null
  }
}
