import { AnimationParams } from "@/types/index"
import { computed, Ref, watch } from "vue"
import useIntersectionObserver from "./useIntersectionObserver"
import useScrollObserver from "./useScrollObserver"

    function apply(
        el:HTMLElement,
        animation:string|AnimationParams,
        repeat:boolean,
        isInView: Ref<boolean>,
        scrollDirection: Ref<string>
    ):void {
        // console.log(targetElement, propAnimation, propsRepeat)


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

        const scrollCallback = (lastScrollTop:number, currentScrollTop:number ) => {
            scrollDirection.value = currentScrollTop < lastScrollTop ? 'up' : 'down'
            lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop
        }

        const intersectCallback = (entry:IntersectionObserverEntry, isInView: Ref<boolean>) => {
            if(entry.isIntersecting) {
                el.classList.add(animationClass.value)
                isInView.value = true
            }
            else {
                // el.classList.remove(animationClass.value)
                isInView.value = false
            }
        }

        const isDirectionAgnostic  = ():boolean => { return typeof animation === 'string'}

        const isBiDirectional = ():boolean => {
            return !!(typeof animation === 'object' && animation.up !== '' && animation.down !== '')
        }

        useIntersectionObserver.observeElement(el, isInView, intersectCallback)
        useScrollObserver.detectScrollDirection(scrollCallback)

        watch([isInView, scrollDirection],( newValues, previousValues) => {
            const [isInView, scrollDirection] = newValues
            if(!repeat && isDirectionAgnostic()) {
                console.log('No Repeat & isDirectionAgnostic: true')
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
