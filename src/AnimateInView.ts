import { Directive, DirectiveBinding } from 'vue'
import { AnimationParams } from '@/types/ScrollInView'
import useAnimateInView from '@/Composables/useAnimateInView'


const animateInView: Directive = {
    mounted(el:HTMLElement, binding:DirectiveBinding) {
        const animation = <AnimationParams> binding.value
        const repeat = <boolean> binding.modifiers.repeat || false

        useAnimateInView.apply(el, animation, repeat)
    },
    beforeUnmount() {
        useAnimateInView.cleanup()
    }
}

export default animateInView;
