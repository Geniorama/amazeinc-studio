import Image from "next/image"
import Layout from "../components/layout/Layout";
import styles from "../styles/Home.module.css"

export default function Home(){
  return(
    <Layout
      title={"AmazeInc Studio"}
      idPage={"amaze-home"}
      header={"principal"}
      headerFixed={true}
    >

    {/* Video */}
    <video className={styles.videoHome} autoplay="true" muted="true" loop="true" src="https://cdn.videvo.net/videvo_files/video/free/2019-11/large_watermarked/190301_1_25_11_preview.mp4"></video>


    </Layout>
  )  
}

