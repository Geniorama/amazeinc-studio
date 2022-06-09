
export const toggleMenu = (menuSelector, activeClass) =>{
    const menu = document.querySelector(menuSelector)
    menu.classList.toggle(activeClass)
}