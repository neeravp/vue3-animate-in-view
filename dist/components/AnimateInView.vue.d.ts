import { AnimationParams } from "@/types/ScrollInView";
declare const _default: import("vue").DefineComponent<{
    threshold: {
        type: NumberConstructor;
        default: number;
    };
    animation: {
        type: (StringConstructor | (() => AnimationParams))[];
        default: string;
    };
    repeat: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    target: import("vue").Ref<any>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    threshold: number;
    animation: string | AnimationParams;
    repeat: boolean;
} & {}>, {
    threshold: number;
    animation: string | AnimationParams;
    repeat: boolean;
}>;
export default _default;
