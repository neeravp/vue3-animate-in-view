import { DefineComponent, Directive, Plugin } from "vue";

// declare const Vue3AnimateInView: Exclude<Plugin['install'], undefined>
declare const Vue3AnimateInView: Plugin

export default Vue3AnimateInView

export const AnimateInViewComponent: DefineComponent<{}, {}, any>
export const AnimateInViewDirective: Directive
