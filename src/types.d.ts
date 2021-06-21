// import { App } from 'vue'

// declare module '@neeravp/vue-3-animate-in-view'
export interface AnimationParams extends Object{
    up: string
    down?: string
}

export declare type intersectionCallback = (entry: IntersectionObserverEntry) => void

export declare type scrollDetectionCallback = (lastScrollPosition: number, currentScrollPodsition: number) => void


// export interface ScrollInView {
//     isInView: (rect: DOMRect, threshold: number) => boolean
//     apply: (
//         el:HTMLElement,
//         options:AnimateInViewOptions,
//         isUpwards:boolean,
//         previousClassName: string
//         ) => void
// }

// export interface AnimateInViewOptions {
//     threshold: number
//     repeat: boolean
//     animationClass:string
//     animationParams:AnimationParams
// }
