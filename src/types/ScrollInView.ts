export interface AnimationParams extends Object{
    up: string
    down?: string
}

export type intersectionCallback = (entry: IntersectionObserverEntry) => void

export type scrollDetectionCallback = (lastScrollPosition: number, currentScrollPodsition: number) => void

export interface ScrollInView {
    isInView: (rect: DOMRect, threshold: number) => boolean
    apply: (
        el:HTMLElement,
        options:AnimateInViewOptions,
        isUpwards:boolean,
        previousClassName: string
        ) => void
}

export interface AnimateInViewOptions {
    threshold: number
    repeat: boolean
    animationClass:string
    animationParams:AnimationParams
}
