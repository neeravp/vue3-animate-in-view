<template>
  <div class="transition-all duration-1000" ref="target">
      <slot></slot>
  </div>
</template>
<style scoped>
.transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
}
.duration-1000 {
    transition-duration: 1000ms;
}
</style>
<script lang="ts">
import { defineComponent, onMounted, ref, onBeforeUnmount, Ref } from "vue"
import { AnimationParams } from "@/types/index";
import useAnimateInView from "@/composables/useAnimateInView"

export default defineComponent({
    name: 'AnimateInView',
    props: {
        threshold: {
            type: Number,
            default: 10
        },
        animation: {
            type: [String , Object as () => AnimationParams],
            default: "fadeInSlide"
        },
        repeat: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const target:Ref<HTMLElement|null> = ref(null)
        const isInView:Ref<boolean> = ref(false)
        const scrollDirection:Ref<string> = ref('down')

        onMounted(() => {
            console.log(target.value)
            useAnimateInView.apply(target.value as HTMLElement, props.animation, props.repeat, isInView, scrollDirection)
        })

        onBeforeUnmount(() => useAnimateInView.cleanup())

        return {
            target,
            isInView,
            scrollDirection
        }
    }
})
</script>
