
export interface AnimationParams extends Object{
    up: string
    down?: string
}

export declare type intersectionCallback = (entry: IntersectionObserverEntry, isInView: Ref<boolean>) => void

export declare type scrollDetectionCallback = (lastScrollPosition: number, currentScrollPodsition: number) => void
