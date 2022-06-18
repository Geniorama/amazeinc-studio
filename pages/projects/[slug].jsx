import Layout from "../../components/layout/Layout";
import Image from "next/image";
import styles from "../../styles/SingleProject.module.css";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import queries from "../../api/queries"
import { flatMap } from "lodash"; 


export default function SingleProject({ locale, dataMenu, data }) {
  const projectData = data.data.project.translation

  return (
    <Layout 
      header={"secondary"} 
      headerFixed={true}
      headerSticky={true}
      footer={true} 
      menuData={dataMenu.data}  
    >
      <article id="project-details">
        <div className={styles.imageTop}>
          {projectData.projectFeatures.coverVideo && projectData.projectFeatures.coverImage
            ?
            <video autoPlay loop preload={true} muted className={styles.coverVideo} poster={projectData.projectFeatures.coverImage.mediaItemUrl}>
              <source src={projectData.projectFeatures.coverVideo} type="video/mp4"/>
              Your browser does not support the video tag.
            </video>
            :
            projectData.projectFeatures.coverImage
            ?
            <Image 
              src={projectData.projectFeatures.coverImage.mediaItemUrl}
              layout="fill"
            />
            :
            ""
          }
          
        </div>

        <section>
          <div className="container">
            <div className={styles.infoProject}>
              <div className={styles.infoLeft}>
                <span className={styles.companyName}>{projectData.projectFeatures.customer}</span>
                <span className={styles.projectName}>{projectData.title}</span>
              </div>
              <div className={styles.infoRight}>
                {projectData.content
                  ?
                  <div className={styles.descProject} dangerouslySetInnerHTML={{__html: projectData.content}}/>
                  :
                  ""
                }
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
              <div className={styles.contGallery}>
                {projectData.projectFeatures.gallery.map((item) => (
                    <a href={item.mediaItemUrl} key={item.id} className={styles.imgStyleRight}>
                      <div className={styles.imgStyleRightCont}>
                        <Image
                          src={item.mediaItemUrl}
                          width={800}
                          height={500}
                          layout="responsive"
                          objectFit="contain"
                        />
                      </div>
                    </a>
                ))}
              </div>
          </div>
        </section>
      </article>
    </Layout>
  );
}

export async function getStaticPaths({ locales }) {
  if (locales == undefined) {
    throw new Error('Please define locales in your next.config')
  }

  const url_api = "https://www.geniorama.site/demo/amazeinc/graphql"

  const resJson = await queries.getAllProjects(url_api)
  const projects = resJson.data.projects.nodes
  const paths = flatMap(projects.map((project) => ({ params: { slug: project.slug } })), (path) => locales.map(loc => ({ locale: loc, ...path })))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ locale, params }) {
  const {slug} = params

  const url_api = "https://www.geniorama.site/demo/amazeinc/graphql"
  let localeForTranslation

  if (locale == "en-US") {
    localeForTranslation = "EN"
  }

  if (locale == "es-ES") {
    localeForTranslation = "ES"
  }


  const data = await queries.getProjectBySlug(url_api, localeForTranslation, slug)
  const dataMenu = await queries.getMenuItems(url_api, localeForTranslation)

  return {
    props: {
      ...(await serverSideTranslations(locale, ["menu"])),
      dataMenu,
      data
    },
  };
}
