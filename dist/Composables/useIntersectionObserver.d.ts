import { intersectionCallback } from "@/types";
declare function observeElement(element: HTMLElement, isIntersectingFn: intersectionCallback, options?: IntersectionObserverInit): void;
declare const _default: {
    observeElement: typeof observeElement;
};
export default _default;