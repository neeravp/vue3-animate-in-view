import AnimateInViewComponent from '@/components/AnimateInView.vue';
export { default as AnimateInViewComponent } from '@/components/AnimateInView.vue';
import AnimateInViewDirective from '@/directives/AnimateInView';
export { default as AnimateInViewDirective } from '@/directives/AnimateInView';

const vue3AnimateInView = {
  install: (app, options) => {
    app.directive('animate-inview', AnimateInViewDirective);
    app.component('animate-in-view', AnimateInViewComponent);
  }
};
// export { default as AnimateInViewDirective } from '@/directives/AnimateInView'

export default vue3AnimateInView;
