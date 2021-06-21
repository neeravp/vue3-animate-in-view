<template>
  <div class="transition-all duration-1000" ref="target">
      <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"
import { AnimationParams } from "@/types/ScrollInView"
import useAnimateInView from "@/composables/useAnimateInView"
import { onBeforeUnmount } from "vue"

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
        const target = ref()
        // let isInView = ref<boolean>(false)
        // let scrollDirection = ref('down')

        onMounted(() => {
            console.log(target.value)
            useAnimateInView.apply(target.value, props.animation, props.repeat)
        })
        onBeforeUnmount(() => useAnimateInView.cleanup())

        return {
            target,
            // isInView,
            // scrollDirection
        }
    }
})
</script>
