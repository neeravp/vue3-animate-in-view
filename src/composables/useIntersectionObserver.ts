import { intersectionCallback } from "@/types"


const intersectionHandler = (isIntersectingFn: intersectionCallback) =>
  function handleIntersection(entries: Array<IntersectionObserverEntry>) {
    entries.forEach((entry) => {
      isIntersectingFn(entry)
    })
  }

function observeElement(
  element: HTMLElement,
  isIntersectingFn: intersectionCallback,
  options?: IntersectionObserverInit
): void {
    console.log(element)
  const handleIntersection = intersectionHandler(isIntersectingFn)
  const observer = new IntersectionObserver(handleIntersection, options)
  observer.observe(element)
}

export default { observeElement }
