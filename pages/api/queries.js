const queries = {
    getMenuItems: async function (url_api, locale) {
        const res = await fetch(url_api, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `
                query getMenuItems {
                    mainMenus(where: {language: ${locale}, orderby: {field: DATE, order: ASC}}) {
                    nodes {
                        title(format: RENDERED)
                        mainMenuFeatures {
                        mainSlug
                        textLine1
                        }
                        main_menuId
                    }
                    }
                }
                `
            })
        })

        const resJson = await res.json()

        return resJson
    },

    getDataHome: async function (url_api) {
        const res = await fetch(url_api, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `
                query dataHome {
                page(idType: URI, id: "home") {
                    homeFeatures {
                    videoCover
                    imageCover {
                        mediaItemUrl
                    }
                    }
                }
                }
                `
            })
        })

        const resJson = await res.json()
        return resJson
    },

    getDataAboutUs: async function (url_api, locale) {
        const res = await fetch(url_api, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `
              query dataAboutUs {
                pageBy(uri: "about-us") {
                  translation(language: ${locale}) {
                    title
                    content(format: RENDERED)
                  }
                }
              }
              `
            })
        })

        const resJson = await res.json()
        return resJson
    },

    getProjectsByCategory: async function (url_api, locale, slug) {
        const res = await fetch(url_api, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `
                    query projectsByCategory {
                      categoryProject(id: "${slug}", idType: SLUG) {
                        name
                        translation(language: ${locale}) {
                          projects {
                            nodes {
                              slug
                              title(format: RENDERED)
                              featuredImage {
                                node {
                                  mediaItemUrl
                                }
                              }
                              projectId
                              projectFeatures {
                                layout
                                customer
                                coverVideo
                              }
                            }
                          }
                        }
                      }
                    }
                    `
            })
        })

        const resJson = await res.json()
        return resJson
    },

    getCategoriesProjects: async function(url_api, locale){
        const res = await fetch(url_api, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                query: `
                query getAllCategoriesProjects {
                    categoriesProject(where: {language: ${locale}}) {
                    nodes {
                        name
                        customSlug {
                        customSlug
                        }
                    }
                    }
                }
                `
            })
        })

        const resJson = await res.json()
        return resJson
    },
    
    getAllCategoriesProjects: async function(url_api){
        const res = await fetch(url_api, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                query: `
                query allCategoriesProjects {
                    categoriesProject {
                    edges {
                        node {
                        slug
                        name
                        }
                    }
                    }
                }
                `
            })
        })

        const resJson = await res.json()
        return resJson
    },

    getAllPortfolios: async function(url_api, locale){
        const res = await fetch(url_api, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                query: `
                query getAllPortfolios {
                    portfolios(where: {language: ${locale}}) {
                      nodes {
                        title(format: RENDERED)
                        downloads {
                          file {
                            mediaItemUrl
                          }
                        }
                        portfolioId
                      }
                    }
                }
                `
            })
        })

        const resJson = await res.json()
        return resJson
    },

    getProjectBySlug: async function(url_api, locale, slug){
        const res = await fetch(url_api, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
              query: `
              query getProject {
                project(id: "${slug}", idType: SLUG) {
                  slug
                  projectId
                  translation(language: ${locale}) {
                    slug
                    title(format: RENDERED)
                    projectFeatures {
                      coverImage {
                        mediaItemUrl
                      }
                      coverVideo
                      customer
                      gallery {
                        mediaItemUrl
                        id
                      }
                    }
                    content(format: RENDERED)
                  }
                }
              }
              `
          })
      })

      const resJson = await res.json()
      return resJson
  },

  getAllProjects: async function(url_api){
      const res = await fetch(url_api, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            query: `
            query getAllProjects {
              projects {
                nodes {
                  slug
                }
              }
            }
            `
        })
    })

    const resJson = await res.json()
    return resJson
  }
}

export default queries