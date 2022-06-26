
export const toggleMenu = (menuSelector, activeClass) =>{
    const menu = document.querySelector(menuSelector)
    menu.classList.toggle(activeClass)
}

export const localeCovert = (locale) =>{
    let localeForTranslation

    if (locale == "en-US") {
        localeForTranslation = "EN"
    }

    if (locale == "es-ES") {
        localeForTranslation = "ES"
    }

    return localeForTranslation
}