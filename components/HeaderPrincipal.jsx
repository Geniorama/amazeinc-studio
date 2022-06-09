import styles from './../styles/HeaderPrincipal.module.css'
import Logo from './../public/logos/logo-amaze.png'

import Image from 'next/image'
import Link from 'next/link'
import SocialNav from './SocialNav'
import MenuPrincipal from './MenuPrincipal'
import { motion } from "framer-motion"
import { useState } from 'react'

export default function HeaderPrincipal({fixed}){
    // State menu
    const [isMenuOpen, setIsMenuOpen] = useState(false)

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
        <header id='amaze-header' className={`${styles.headerPrincipal} ${fixed ? styles.headerFixed : ""}`}>
            <div className='container'>
                <nav className={styles.navMenu}>
                    <button id='btn-toggle-nav' className={styles.btnToggleMenu} onClick={() => setIsMenuOpen(true)} role="button">
                        <span className={styles.btnToggleMenu__line}></span>
                        <span className={styles.btnToggleMenu__line}></span>
                        <span className={styles.btnToggleMenu__line}></span>
                    </button>

                    <div className={styles.headerContRight}>
                        <SocialNav />
                        <a className={styles.btnLanguage} href="#">
                            ES
                        </a>
                    </div>
                </nav>
            </div>

            {/* Menu principal */}
            <motion.div className={styles.boxMenu} initial={"close"} animate={isMenuOpen ? "open" : "close"} variants={variants}>
                
                {/* Background overlay */}
                <motion.div initial={"close"} animate={isMenuOpen ? "open" : "close"} variants={variantsOverlay} className={styles.menuOverlay}></motion.div>
                
                <MenuPrincipal
                    handler={setIsMenuOpen}
                /> 
            </motion.div>        
        </header>
    )
}