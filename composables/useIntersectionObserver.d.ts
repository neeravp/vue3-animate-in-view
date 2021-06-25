import { intersectionCallback } from "@/types/index";
import { Ref } from "vue";
declare function observeElement(element: HTMLElement, isInView: Ref<boolean>, isIntersectingFn: intersectionCallback, options?: IntersectionObserverInit): void;
declare const _default: {
    observeElement: typeof observeElement;
};
export default _default;
