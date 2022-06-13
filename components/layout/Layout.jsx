import Head from "next/head";
import Footer from  "../Footer";
import HeaderPrincipal from "../HeaderPrincipal";
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/router";
import PreloadPages from "../PreloadPages";

export default function Layout({children, title, description, idPage, header, headerFixed, footer, translate}){
    const router = useRouter()
    // console.log(translate('menu:see_our_work'))
    const variants = {
        show: {
            opacity:1
        },

        hide: {
            opacity:0
        }
    }

    return(
        <AnimatePresence exitBeforeEnter>
        <div className="amaze-layout">
            {/* Preloader no carga en el home */}
            {router.asPath != "/" ? 
                <PreloadPages theme={'light'} />
            : ""}
            <div id="amaze-ancle-top"></div>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <HeaderPrincipal
                fixed={headerFixed}
                handlerT={translate}
                style={header}
            />
            
            {router.asPath != "/"?
                <motion.main key={"main"} className="amaze-main" id={idPage} initial={"hide"} animate={"show"} variants={variants} transition={{delay: 1, duration: 2}} >
                    {children}
                </motion.main>
                :
                <main className="amaze-main" id={idPage} >
                    {children}
                </main>
            }
            
            
            {footer 
                ?
                <Footer />
                :
                ""
            }
            
        </div>
        </AnimatePresence>
    )
}