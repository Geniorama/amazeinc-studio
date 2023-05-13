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
import PreloadPages from "../../components/PreloadPages";


export default function SingleProject({ dataMenu, data }) {
  const [imageUrl, setImageUrl] = useState("")
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isLoading, setLoading] = useState(true)
  
  const router = useRouter()

  useEffect(()=>{
    if(data){
      setLoading(false)
    }

    AOS.init({
      duration: 1000
    })
    
  },[data])


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
  let videoArr = []

  if(data){
    if(data.data.project.translation.projectFeatures.galleryVideo){
      videoArr = (data.data.project.translation.projectFeatures.galleryVideo).split(',')
    }
  }
  

  let countGallery = 0

  return (
    <>
      <PreloadPages theme={"dark"} trigger={data}/>
      <Layout 
        header={"secondary"} 
        headerFixed={true}
        headerSticky={true}
        footer={true} 
        menuData={dataMenu.data}  
      >
      {data
      
      ?
      <article id="project-details">
          <div className={styles.imageTop}>
            {data.data.project.translation.projectFeatures.coverVideo && data.data.project.translation.projectFeatures.coverImage
              ?
              <video autoPlay loop preload={"true"} muted className={styles.coverVideo} poster={data.data.project.translation.projectFeatures.coverImage.mediaItemUrl}>
                <source src={data.data.project.translation.projectFeatures.coverVideo} type="video/mp4"/>
                Your browser does not support the video tag.
              </video>
              :
              data.data.project.translation.projectFeatures.coverImage
              ?
              <Image 
                src={data.data.project.translation.projectFeatures.coverImage.mediaItemUrl}
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
                  <span className={styles.companyName}>{data.data.project.translation.projectFeatures.customer}</span>
                  <span className={styles.projectName}>{data.data.project.translation.title}</span>
                  {data.data.project.translation.content
                    ?
                    <div className={styles.descProject} dangerouslySetInnerHTML={{__html: data.data.project.translation.content}}/>
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
                  {data.data.project.translation.projectFeatures.gallery
                  ?
                  data.data.project.translation.projectFeatures.gallery.map((item) => (
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

                  {data.data.project.translation.projectFeatures.galleryVideo
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
    </>
  );
}


export async function getServerSideProps({ locale, params, req, res }) {
  const { slug } = params

  try {
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=59'
    )
    const dataMenu = await queries.getMenuItems(API_URL, localeCovert(locale))
    const data = await queries.getProjectBySlug(API_URL, localeCovert(locale), slug)

    return {
      props: {
        ...(await serverSideTranslations(locale, ["menu"])),
        dataMenu,
        data
      }
    }
    
  } catch (error) {
    return null
  }
}
