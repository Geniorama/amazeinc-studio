import styles from './../styles/HeaderPrincipal.module.css'
import Logo from './../public/logos/logo-amaze.png'

import Image from 'next/image'
import Link from 'next/link'
import SocialNav from './SocialNav'
import MenuPrincipal from './MenuPrincipal'
import { toggleMenu } from '../helpers'

export default function HeaderPrincipal({fixed}){
    // const openMenu = (e) => {
    //     const amaze_menu = document.getElementById('amaze-menu')
    //     const active_class = styles.genNavActive

    //     amaze_menu.classList.add(active_class)
    // }

    // const closeMenu = (e) => {
    //     const amaze_menu = document.getElementById('amaze-menu')
    //     const active_class = styles.amazeNavActive

    //     amaze_menu.classList.remove(active_class)
    // }
    

    return(
        <header id='amaze-header' className={`${styles.headerPrincipal} ${fixed ? styles.headerFixed : ""}`}>
            <div className='container'>
                <nav className={styles.navMenu}>
                    <button id='btn-toggle-nav' className={styles.btnToggleMenu} onClick={(e) => toggleMenu("." + styles.boxMenu, styles.activeMenu)} role="button">
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
            <div className={styles.boxMenu}>
                <MenuPrincipal />
            </div>
            
        </header>
    )
}