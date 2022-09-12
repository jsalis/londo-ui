import type { Placement } from "@floating-ui/react-dom";

export function getStaticSide(placement: Placement) {
    const [sideKey] = placement.split("-");
    const sides: any = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right",
    };
    return sides[sideKey] as string;
}

export function getTransformOrigin(placement: Placement) {
    const [sideKey, alignKey] = placement.split("-");
    const align = alignKey === "start" ? "0" : alignKey === "end" ? "100%" : "50%";
    const sides: any = {
        top: `${align} 100%`,
        right: `0% ${align}`,
        bottom: `${align} 0%`,
        left: `100% ${align}`,
    };
    return sides[sideKey] as string;
}
