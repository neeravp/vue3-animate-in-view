import { AnimationParams } from "@/types/index";
import { Ref } from "vue";
declare function apply(el: HTMLElement, animation: string | AnimationParams, repeat: boolean, isInView: Ref<boolean>, scrollDirection: Ref<string>): void;
declare function cleanup(): void;
declare const _default: {
    apply: typeof apply;
    cleanup: typeof cleanup;
};
export default _default;
