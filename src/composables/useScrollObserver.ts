import { scrollDetectionCallback } from "@/types/index"


let handler: {():void}

function detectScrollDirection(scrollDetectionHandler:scrollDetectionCallback):void {
    let lastScrollTop = window.pageYOffset
    let ticking = false

    handler = () => {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop
        if(!ticking) {
            window.requestAnimationFrame(() => {
                // execute scrollDetectionHandler
                scrollDetectionHandler(lastScrollTop, currentScrollTop)
                lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop
                ticking = false
            })
            ticking = true
        }
    }
    window.addEventListener("scroll", handler)
}

function removeEventListener():void {
    window.removeEventListener("scroll", handler)
}

export default { detectScrollDirection, removeEventListener }
