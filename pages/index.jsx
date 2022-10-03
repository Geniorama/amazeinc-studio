import Layout from "../components/layout/Layout";
import styles from "../styles/Home.module.css";
import LogoAmazeinc from "../public/logos/amazeinc-logo.svg";
import Image from 'next/image';
import Link from 'next/link'
import TextArrow from "../components/TextArrow";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";
import { motion, AnimatePresence } from "framer-motion"
import queries from "../api/queries";
import API_URL from "../api/apiUrl";
import { useState } from "react";
import { useEffect } from "react";
import { localeCovert } from "../helpers";

export default function Home({dataMenu, data}){
  const [isLoading, setLoading] = useState(true)
  const [isVideo, setVideo] = useState(false)
  const [isImage, setImage] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    if(data){
      setLoading(false)
    }
  },[data])

  const variants = {
    show:{
      y: 0,
      rotate: -10,
      scale: 2
    },

    hide:{
      y: "-100%",
      rotate: 0,
      scale: 1
    }
  }

  const variantsText = {
    show: {
      opacity: 1
    },

    hide: {
      opacity: 0
    }
  }
  
  const imageCoverHome = isImage


  // https://admin.amazeincstudio.com/wp-content/uploads/2022/10/nadine-shaabana-DrPcfuaeYFQ-unsplash.jpg


  if(isLoading){
    if(data.data.page.homeFeatures.videoCover){
      fetch(data.data.page.homeFeatures.videoCover)
      .then(function(response){
        if(response.ok){
          setVideo(data.data.page.homeFeatures.videoCover)
          console.log('Existe el video')
          return
        }
        setVideo('https://admin.amazeincstudio.com/wp-content/uploads/2022/10/video.mp4')
      })
    }

    // data.data.page.homeFeatures.imageCover.mediaItemUrl
    if(data.data.page.homeFeatures.imageCover){
      setImage(data.data.page.homeFeatures.imageCover.mediaItemUrl)
    }
  }
  

  return(
    <Layout
      title={"AmazeInc Studio"}
      idPage={"amaze-home"}
      header={"principal"}
      headerFixed={true}
      translate={t}
      menuData={dataMenu.data}
    >

    {/* Video */}
    <div className={styles.contVideoHome}>
      <div className={styles.videoCaption}>
          <Image
            width={200}
            src={LogoAmazeinc}
            alt="Logo AmazeInc"
          />
          <Link href={"/projects/category/all"}>
            <motion.a key={"video-text-bottom"} animate={'show'} initial={'hide'} variants={variantsText} transition={{delay: 1}} className={styles.videoCaptionText}>
                <span className={styles.videoCaptionTextTop}>
                  {t('homepage:see_our_amazing')}
                </span>
                <span className={styles.videoCaptionTextBottom}>
                  <TextArrow
                     text={t('homepage:works')}
                     fontSize="40px"
                     fontFamily={"'Libre Caslon Text', serif"}
                     arrowColor="white"
                  />
                </span>
            </motion.a>
          </Link>

          <motion.div key={"layer-home"} className={styles.layerHome} initial="show" animate={!isLoading ? 'hide':'show'} variants={variants} transition={{duration: 2, ease: "easeInOut"}}></motion.div>
      </div>

      {isVideo
        ?
        <video preload={"true"} poster={isVideo ? isVideo : ""} className={styles.videoHome} autoPlay muted loop>
          <source src={isVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        :
        <Image 
          src={imageCoverHome}
          layout="fill"
          objectFit="cover"
        />
      }
    </div>
    </Layout>
  )  
}

export async function getStaticProps({locale}){
  try {
    const dataMenu = await queries.getMenuItems(API_URL, localeCovert(locale))
    const data = await queries.getDataHome(API_URL)
    return {
      props: {
          ...(await serverSideTranslations(locale, ['homepage', 'menu'])),
          dataMenu,
          data
      }
    }
  } catch (error) {
    return null
  }
}

