import Layout from "../../components/layout/Layout";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";


export default function SingleProject({locale}) {
  const { t } = useTranslation()
  return (
    <Layout
      header={"secondary"}
      headerFixed={true}
      footer={true}
      translate={t}
    >

    </Layout>
  )
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

  return {
    props: {
        ...(await serverSideTranslations(locale, ['menu']))
    }
  }
}
