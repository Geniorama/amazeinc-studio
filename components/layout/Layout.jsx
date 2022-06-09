import Head from "next/head";
import Footer from  "../Footer";
import HeaderPrincipal from "../HeaderPrincipal";

export default function Layout({children, title, description, idPage, header, headerFixed, footer}){
    return(
        <div className="amaze-layout">
            <div id="amaze-ancle-top"></div>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {header="principal" ?
                <HeaderPrincipal
                    fixed={headerFixed}
                />
                :
                <HeaderSecondary />
            }

            <main className="amaze-main" id={idPage}>
                {children}
            </main>

            {footer 
                ?
                <Footer />
                :
                ""
            }
            
        </div>
    )
}