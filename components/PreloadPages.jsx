import React from 'react'
import Image from 'next/image';
import LogoAmazeinc from "../public/logos/amazeinc-logo.svg";
import { motion, AnimatePresence } from "framer-motion"
import styles from "../styles/PreloadPages.module.css"

export default function PreloadPages({theme}) {
  const variants = {
    hide: {
        y: "-200%"
    },

    show:{
        y: 0
    }
  }

  const variantsLayer ={
    show: {
      rotate: 0,
      scale: 1
    },

    hide: {
      y: "-150%",
      rotate: -10,
      scale: 2
    }
  }
  
  return (
    
    <motion.div key={"preloader"} className={`${styles.preloaderWrap}`} initial={"show"} animate={'hide'} variants={variants} transition={{delay: 1, duration: 2}}>
        <motion.div key={"layer"} className={`${styles.layerPreloader} ${theme =="light" ? styles.layerLight : styles.layerDark}`} initial={"show"} animate={'hide'} variants={variantsLayer} transition={{duration: 3}}></motion.div>
        <Image
            width={200}
            src={LogoAmazeinc}
            alt="Logo AmazeInc"
        />
    </motion.div>
  )
}
