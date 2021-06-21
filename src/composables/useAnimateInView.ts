import { AnimationParams } from "@/types/ScrollInView"
import { computed, ref, watch } from "vue"
import useIntersectionObserver from "./useIntersectionObserver"
import useScrollObserver from "./useScrollObserver"


    const isInView = ref<boolean>(false)
    const scrollDirection = ref('down')
    let animation:string|AnimationParams
    let repeat:boolean
    let el:HTMLElement

    const animationClass = computed(() => {
        let _animationClass = ''
        if(typeof animation === 'string') {
            _animationClass = animation
        }
        if(typeof animation === 'object') {
            _animationClass = <string> (scrollDirection.value === 'down' ? animation.down : animation.up)
        }

        return _animationClass
    })

    function isDirectionAgnostic():boolean { return typeof animation === 'string'}

    function isBiDirectional():boolean {
        return !!(typeof animation === 'object' && animation.up !== '' && animation.down !== '')
    }

    const scrollCallback = (lastScrollTop:number, currentScrollTop:number ) => {
        scrollDirection.value = currentScrollTop < lastScrollTop ? 'up' : 'down'
        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop
    }

    const intersectCallback = (entry:IntersectionObserverEntry) => {
        if(entry.isIntersecting) {
            el.classList.add(animationClass.value)
            isInView.value = true
        }
        else {
            // el.classList.remove(animationClass.value)
            isInView.value = false
        }
    }

    function apply(targetElement:HTMLElement, propAnimation:string|AnimationParams, propsRepeat:boolean):void {
        console.log(targetElement, propAnimation, propsRepeat)
        animation = propAnimation
        repeat = propsRepeat
        el = targetElement

        useIntersectionObserver.observeElement(el, intersectCallback)
        useScrollObserver.detectScrollDirection(scrollCallback)

        watch([isInView, scrollDirection],( newValues, previousValues) => {
            const [isInView, scrollDirection] = newValues
            if(!repeat && isDirectionAgnostic()) {
                console.log('No Repeat & isDirectionAgnostic: false')
                return
            } else if(!isInView) {
                console.log('Not in view')
                el.classList.remove(animationClass.value)
            } else if(isBiDirectional()){
                console.log('isBiDirectional')
                animation = <AnimationParams> animation
                if(scrollDirection === 'up') {
                    el.classList.remove(animation.down as string)
                    el.classList.add(animationClass.value)
                }
                if(scrollDirection === 'down') {
                    el.classList.remove(animation.up)
                    el.classList.add(animationClass.value)
                }
            }
        })
    }

    function cleanup():void {
        useScrollObserver.removeEventListener()
    }

    export default { apply, cleanup }
