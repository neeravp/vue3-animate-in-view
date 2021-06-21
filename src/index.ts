import AnimateInViewComponent from './components/AnimateInView.vue'
import { App, Plugin } from 'vue'
import AnimateInViewDirective from './AnimateInView'

const plugin: Plugin  = {
    install: (app:App, options?:any) => {
        app.directive('animate-inview', AnimateInViewDirective)
        app.component('animate-in-view', AnimateInViewComponent)
    }
}

export default plugin
