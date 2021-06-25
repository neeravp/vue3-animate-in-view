import { Directive, DirectiveBinding, ref } from 'vue'
import {AnimationParams} from '@/types/index'
import useAnimateInView from '@/composables/useAnimateInView'



const animateInView: Directive = {
    mounted(el:HTMLElement, binding:DirectiveBinding) {
        console.log(binding)
        const isInView = ref<boolean>(false)
        const scrollDirection = ref('down')
        const animation = <string|AnimationParams> binding.value
        const repeat = <boolean> binding.modifiers.repeat || false

        useAnimateInView.apply(el, animation, repeat, isInView, scrollDirection)
    },
    beforeUnmount() {
        useAnimateInView.cleanup()
    }
}

export default animateInView;
