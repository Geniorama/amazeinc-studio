import styles from './../styles/HeaderPrincipal.module.css'
import Logo from './../public/logos/logo-amaze.png'

import Image from 'next/image'
import Link from 'next/link'
import SocialNav from './SocialNav'
import MenuPrincipal from './MenuPrincipal'
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'


export default function HeaderPrincipal({fixed, style, menuData, headerSticky}){
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    
    let router = useRouter()

    useEffect(()=> {
        if(headerSticky){
            const menu = document.getElementById('amaze-header')
            const stickyClass = styles.headerSticky

            window.addEventListener('scroll', (e) => {
                if(window.scrollY > 300){
                    menu.classList.add(stickyClass)
                } else {
                    menu.classList.remove(stickyClass)
                }
            });
        }
    }, [])

    let langLink = {}

    if(router.locale === "es-ES") {
        langLink = {
            locale: "en-US",
            text: "EN",
            title: "English"
        }
    }

    if(router.locale === "en-US") {
         langLink = {
            locale: "es-ES",
            text: "ES",
            title: "Spanish"
        }
    }
    
    // Animation variants
    const variants = {
        open:{
            y: 0,
            transition: {
                type: "spring",
                stiffness: 20,
                restDelta: 0
            }
        },
        close:{
            y: "-200%",
            transition: {
                type: "spring",
                stiffness: 20,
                restDelta: 0
            }
        }
    }

    // Animation overlay variants
    const variantsOverlay = {
        open:{
            rotate: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 20,
                restDelta: 0
            }
        },

        close:{
            rotate: -10,
            scale: 2,
            transition: {
                type: "spring",
                stiffness: 20,
                restDelta: 0
            }
        }
    }

    return(
        <header id='amaze-header' className={`${styles.header} ${fixed ? styles.headerFixed : ""} ${style=="secondary" ? styles.headerSecondary : ""}`}>
            <div className='container'>
                {style=="principal"
                ?
                <nav className={styles.navMenu}>
                    <button id='btn-toggle-nav' className={styles.btnToggleMenu} onClick={() => setIsMenuOpen(true)} role="button">
                        <span className={styles.btnToggleMenu__line}></span>
                        <span className={styles.btnToggleMenu__line}></span>
                        <span className={styles.btnToggleMenu__line}></span>
                    </button>

                    <div className={styles.headerContRight}>
                        <SocialNav />
                        <Link href={router.asPath} locale={langLink.locale}>
                            <a className={styles.btnLanguage} title={langLink.title}>
                                {langLink.text}
                            </a>
                        </Link>
                    </div>
                </nav>
                :
                <nav className={styles.navMenu}>
                    <div className={styles.navMenuContSecondary}>
                        <button id='btn-toggle-nav' className={styles.btnToggleMenu} onClick={() => setIsMenuOpen(true)} role="button">
                            <span className={styles.btnToggleMenu__line}></span>
                            <span className={styles.btnToggleMenu__line}></span>
                            <span className={styles.btnToggleMenu__line}></span>
                        </button>

                        <div className={styles.headerContRight}>
                            <SocialNav />
                            <Link href={router.asPath} locale={langLink.locale}>
                                <a className={styles.btnLanguage} title={langLink.title}>
                                    {langLink.text}
                                </a>
                            </Link>
                            
                        </div>
                    </div>
                    <div className={styles.headerBrand}>
                        <Link href={"/"}>
                            <a>
                                <Image
                                    src={Logo}
                                />
                            </a>
                        </Link>
                    </div>
                    
                </nav>
                }
                
            </div>

            {/* Menu principal */}

            <AnimatePresence>
                <motion.div className={styles.boxMenu} initial="close" animate={isMenuOpen ? "open" : "close"} exit="close" variants={variants}>
                    
                    {/* Background overlay */}
                    <motion.div initial={"close"} animate={isMenuOpen ? "open" : "close"} variants={variantsOverlay} className={styles.menuOverlay}></motion.div>
                    
                    <MenuPrincipal
                        handler={setIsMenuOpen}
                        menuData={menuData}
                    /> 
                </motion.div>
            </AnimatePresence>
        </header>
    )
}