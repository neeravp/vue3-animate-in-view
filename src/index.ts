import AnimateInViewComponent from './components/AnimateInView.vue'
import { App } from '@vue/runtime-core'
import AnimateInViewDirective from './AnimateInView'

export default {
    install: (app:App, options:object) => {
        app.directive('animate-inview', AnimateInViewDirective)
        app.component('animate-in-view', AnimateInViewComponent)
    }
}
