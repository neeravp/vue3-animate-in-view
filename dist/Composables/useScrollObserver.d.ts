import { scrollDetectionCallback } from "@/types/ScrollInView";
declare function detectScrollDirection(scrollDetectionHandler: scrollDetectionCallback): void;
declare function removeEventListener(): void;
declare const _default: {
    detectScrollDirection: typeof detectScrollDirection;
    removeEventListener: typeof removeEventListener;
};
export default _default;
