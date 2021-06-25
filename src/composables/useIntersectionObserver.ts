import { intersectionCallback } from "@/types/index"
import { Ref } from "vue"

const intersectionHandler = (isIntersectingFn: intersectionCallback, isInView: Ref<boolean>) =>
  function handleIntersection(entries: Array<IntersectionObserverEntry>) {
    entries.forEach((entry) => {
      isIntersectingFn(entry, isInView)
    })
  }

function observeElement(
  element: HTMLElement,
  isInView: Ref<boolean>,
  isIntersectingFn: intersectionCallback,
  options?: IntersectionObserverInit
): void {
    console.log(element)
  const handleIntersection = intersectionHandler(isIntersectingFn, isInView)
  const observer = new IntersectionObserver(handleIntersection, options)
  observer.observe(element)
}

export default { observeElement }
