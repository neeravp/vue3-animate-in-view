import { App, Plugin } from 'vue'

import AnimateInViewComponent from '@/components/AnimateInView.vue'
import AnimateInViewDirective from '@/directives/AnimateInView'

const vue3AnimateInView: Plugin  = {
    install: (app:App, options?:any) => {
        app.directive('animate-inview', AnimateInViewDirective)
        app.component('animate-in-view', AnimateInViewComponent)
    }
}

export default vue3AnimateInView;

export {
    AnimateInViewComponent,
    AnimateInViewDirective
}

// export { default as AnimateInViewComponent } from '@/components/AnimateInView.vue'
// export { default as AnimateInViewDirective } from '@/directives/AnimateInView'
