import AnimateInViewComponent from './AnimateInView.vue'
import { App, Plugin } from 'vue'
import AnimateInViewDirective from './AnimateInView'

const vue3AnimateInView: Plugin  = {
    install: (app:App, options?:any) => {
        app.directive('animate-inview', AnimateInViewDirective)
        app.component('animate-in-view', AnimateInViewComponent)
    }
}

export default vue3AnimateInView
