import Layout from "./../../components/layout/Layout";
import styles from "./../../styles/ProjectsArchive.module.css";
import TextArrow from "../../components/TextArrow";
import Link from "next/link";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";
import MultimediaGallery from "../../components/MultimediaGallery"

export default function Projects(props) {
  const { t } = useTranslation()
  return (
    <Layout
      title={"AmazeInc Studio"}
      idPage={"amaze-about-us"}
      header={"principal"}
      headerFixed={true}
      footer={true}
      translate={t}
    >
      <div className={styles.contProjectArchive}>
        <div className="container">
          <div className={styles.contProjectsTop}>
            <div className={styles.contTitle}>
              <h2>
                OUR<br></br>WORK
              </h2>
            </div>

            {/* Menu Categories */}
            <div className={styles.contCategories}>
              <ul className={styles.contItemsCategories}>
                <li>
                  <Link href="#">
                    <a>
                      <TextArrow
                        text={"All"}
                        arrowColor={"var(--s-color)"}
                        fontFamily={"'Libre Caslon Text', serif"}
                      />
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a>
                      <TextArrow
                        text={"Photography"}
                        arrowColor={"var(--s-color)"}
                        fontFamily={"'Libre Caslon Text', serif"}
                      />
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a>
                      <TextArrow
                        text={"Commercial"}
                        arrowColor={"var(--s-color)"}
                        fontFamily={"'Libre Caslon Text', serif"}
                      />
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a>
                      <TextArrow
                        text={"Film"}
                        arrowColor={"var(--s-color)"}
                        fontFamily={"'Libre Caslon Text', serif"}
                      />
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a>
                      <TextArrow
                        text={"Video"}
                        arrowColor={"var(--s-color)"}
                        fontFamily={"'Libre Caslon Text', serif"}
                      />
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a>
                      <TextArrow
                        text={"All"}
                        arrowColor={"var(--s-color)"}
                        fontFamily={"'Libre Caslon Text', serif"}
                      />
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a>
                      <TextArrow
                        text={"All"}
                        arrowColor={"var(--s-color)"}
                        fontFamily={"'Libre Caslon Text', serif"}
                      />
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a>
                      <TextArrow
                        text={"All"}
                        arrowColor={"var(--s-color)"}
                        fontFamily={"'Libre Caslon Text', serif"}
                      />
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a>
                      <TextArrow
                        text={"All"}
                        arrowColor={"var(--s-color)"}
                        fontFamily={"'Libre Caslon Text', serif"}
                      />
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a>
                      <TextArrow
                        text={"All"}
                        arrowColor={"var(--s-color)"}
                        fontFamily={"'Libre Caslon Text', serif"}
                      />
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.gridProjects}>
              <div className={styles.gridProjectsItem}>
                <MultimediaGallery/>
              </div>

              <div className={styles.gridProjectsItem}>
                <MultimediaGallery/>
              </div>

              <div className={styles.gridProjectsItem}>
                <MultimediaGallery/>
              </div>

              <div className={styles.gridProjectsItem}>
                <MultimediaGallery/>
              </div>

              <div className={styles.gridProjectsItem}>
                <MultimediaGallery/>
              </div>

              <div className={`${styles.gridProjectsItem} ${styles.gridProjectsItemFeat}`}>
                <MultimediaGallery/>
              </div>

              <div className={`${styles.gridProjectsItem} ${styles.gridProjectsItemVertical}`}>
                <MultimediaGallery/>
              </div>

              <div className={styles.gridProjectsItem}>
                <MultimediaGallery/>
              </div>

              <div className={`${styles.gridProjectsItem} ${styles.gridProjectsItemFeat}`}>
                <MultimediaGallery/>
              </div>

              <div className={`${styles.gridProjectsItem} ${styles.gridProjectsItemVertical}`}>
                <MultimediaGallery/>
              </div>

              <div className={styles.gridProjectsItem}>
                <MultimediaGallery/>
              </div>

              <div className={styles.gridProjectsItem}>
                <MultimediaGallery/>
              </div>

              <div className={styles.gridProjectsItem}>
                <MultimediaGallery/>
              </div>

              <div className={styles.gridProjectsItem}>
                <MultimediaGallery/>
              </div>

              <div className={`${styles.gridProjectsItem} ${styles.gridProjectsItemFeat}`}>
                <MultimediaGallery/>
              </div>

              <div className={styles.gridProjectsItem}>
                <MultimediaGallery/>
              </div>

              <div className={styles.gridProjectsItem}>
                <MultimediaGallery/>
              </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({locale}){
  return {
    props: {
        ...(await serverSideTranslations(locale, ['menu'])) 
    }
  }
}