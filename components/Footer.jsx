import Link from "next/link";
import styles from "../styles/Footer.module.css"

export default function Footer(){
    return(
        <div className={styles.containerFooter}>
            <span>Amaze Inc 2022 | All rights reserved ®</span>
            <span>Powered by 
                <Link href="#">
                    <a className={styles.amazeWebLink}>
                        Geniorama
                    </a>
                </Link> </span>
        </div>
    )
}