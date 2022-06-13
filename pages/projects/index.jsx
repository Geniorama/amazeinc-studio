import Layout from "./../../components/layout/Layout";
import styles from "./../../styles/ProjectsArchive.module.css";
import TextArrow from "../../components/TextArrow";
import Link from "next/link";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";
import MultimediaGallery from "../../components/MultimediaGallery"

export default function Projects({locale, data}) {
  const projects = data.data.projects.nodes

  const { t } = useTranslation()
  return (
    <Layout
      title={"AmazeInc Studio"}
      idPage={"amaze-about-us"}
      header={"secondary"}
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
                    <a className={styles.catActive}>
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

          {/* Grid Projects */}
          <div className={styles.gridProjects}>
              {projects.map((item) =>{
                let categories = item.categoriesProject
                let cats = ""
                let counter = 0

                categories.nodes.forEach(element => {
                  counter ++
                  if(counter > 1){
                    cats +=  "," + element.slug
                  } else {
                    cats += element.slug
                  }
                });
                return (
                  <div key={item.projectFeatures.projectId} className={`${styles.gridProjectsItem} ${item.projectFeatures.layout==2 ? styles.gridProjectsItemFeat : item.projectFeatures.layout==3 ? styles.gridProjectsItemVertical : ""} `} dataCategories={cats}>
                    <MultimediaGallery
                      title={item.title}
                      customer={item.projectFeatures.customer}
                      coverImage={item.featuredImage.node.mediaItemUrl}
                    />
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({locale}){
  const url_api = "https://www.geniorama.site/demo/amazeinc/graphql"
  const res = await fetch(url_api, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
      query allProjects {
        projects {
          nodes {
            title(format: RENDERED)
            projectFeatures {
              coverVideo {
                mediaItemUrl
              }
              customer
              layout
            }
            featuredImage {
              node {
                mediaItemUrl
              }
            }
            projectId
            categoriesProject {
              nodes {
                categoryProjectId
                name
                slug
              }
            }
          }
        }
      }
      `
    })
  })

  const data = await res.json()

  // const resCats = await fetch(url_api, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     query: `
  //     query allProjects {
  //       projects {
  //         nodes {
  //           title(format: RENDERED)
  //           projectFeatures {
  //             coverVideo {
  //               mediaItemUrl
  //             }
  //             customer
  //             layout
  //           }
  //           featuredImage {
  //             node {
  //               mediaItemUrl
  //             }
  //           }
  //           projectId
  //         }
  //       }
  //     }
  //     `
  //   })
  // })

  return {
    props: {
        ...(await serverSideTranslations(locale, ['menu'])),
        data
    }
  }
}