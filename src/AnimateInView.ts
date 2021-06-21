import { Directive, DirectiveBinding } from 'vue'
import {AnimationParams} from '@/types'
import useAnimateInView from '@/composables/useAnimateInView'


const animateInView: Directive = {
    mounted(el:HTMLElement, binding:DirectiveBinding) {
        const animation =   <AnimationParams>binding.value
        const repeat = <boolean> binding.modifiers.repeat || false

        useAnimateInView.apply(el, animation, repeat)
    },
    beforeUnmount() {
        useAnimateInView.cleanup()
    }
}

export default animateInView;
