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

export default function Home({locale, dataMenu}){
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const { t } = useTranslation()

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await queries.getDataHome(API_URL)
      setData(res)
      setLoading(false)
    }

    fetchPosts()

  }, [])

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

  if(isLoading) return (
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
            <motion.a key={"video-text-bottom"} className={styles.videoCaptionText}>
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

          <motion.div key={"layer-home"} className={styles.layerHome}></motion.div>
      </div>
    </div>
    </Layout>
  )

  
  if (!data) return <p>No profile data</p>

  const videoCoverHome = data.data.page.homeFeatures.videoCover
  const imageCoverHome = data.data.page.homeFeatures.imageCover.mediaItemUrl

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

          <motion.div key={"layer-home"} className={styles.layerHome} initial="show" animate={'hide'} variants={variants} transition={{duration: 2, ease: "easeInOut"}}></motion.div>
      </div>

      {videoCoverHome
        ?
        <video poster={imageCoverHome ? imageCoverHome : ""} className={styles.videoHome} autoPlay muted loop>
          <source src={videoCoverHome} type="video/mp4" />
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
          ...(await serverSideTranslations(locale, ['homepage', 'menu'])),
          dataMenu
      }
    }
    
  } catch (error) {
    console.log(error)
    return null
  }
}

