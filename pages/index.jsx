import Layout from "../components/layout/Layout";
import styles from "../styles/Home.module.css";
import LogoAmazeinc from "../public/logos/amazeinc-logo.svg";
import Image from 'next/image';
import Link from 'next/link'
import TextArrow from "../components/TextArrow";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";

export default function Home(props){
  const { t } = useTranslation()

  return(
    <Layout
      title={"AmazeInc Studio"}
      idPage={"amaze-home"}
      header={"principal"}
      headerFixed={true}
    >

    {/* Video */}
    <div className={styles.contVideoHome}>
      <div className={styles.videoCaption}>
          <Image
            width={200}
            src={LogoAmazeinc}
          />
          <Link href={"/projects"}>
            <a className={styles.videoCaptionText}>
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
            </a>
          </Link>
          
      </div>
      <video className={styles.videoHome} autoPlay muted loop src="https://cdn.videvo.net/videvo_files/video/free/2013-11/large_watermarked/RotatingLens1Videvo_preview.mp4"></video>
    </div>
    </Layout>
  )  
}

export async function getStaticProps({locale}){
  return {
    props: {
        ...(await serverSideTranslations(locale, ['homepage'])) 
    }
  }
}

