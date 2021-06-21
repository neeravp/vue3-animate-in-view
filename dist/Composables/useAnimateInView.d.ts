import { AnimationParams } from "@/types";
declare function apply(targetElement: HTMLElement, propAnimation: string | AnimationParams, propsRepeat: boolean): void;
declare function cleanup(): void;
declare const _default: {
    apply: typeof apply;
    cleanup: typeof cleanup;
};
export default _default;
