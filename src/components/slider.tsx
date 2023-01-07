import type { MarginProps, WidthProps, HeightProps } from "styled-system";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { forwardRef } from "react";
import { margin, width, height } from "styled-system";
import styled from "styled-components";

type SliderPrimitiveProps = React.ComponentProps<typeof SliderPrimitive.Root>;

export interface SliderProps
    extends Omit<SliderPrimitiveProps, "onChange" | "onValueCommit">,
        MarginProps,
        WidthProps,
        HeightProps {
    value?: number[];
    defaultValue?: number[];
    onValueChange?: (val: number[]) => void;
    onChange?: (val: number[]) => void;
    orientation?: "horizontal" | "vertical";
    min?: number;
    max?: number;
    step?: number;
    minStepsBetweenThumbs?: number;
    inverted?: boolean;
    disabled?: boolean;
}

const SliderTrack = styled(SliderPrimitive.Track)`
    position: relative;
    flex-grow: 1;
    border-radius: ${(p) => p.theme.radii.base}px;
    background-color: ${(p) => p.theme.colors.gray[2]};
    transition: background-color 0.3s;

    &[data-orientation="horizontal"] {
        height: 4px;
    }

    &[data-orientation="vertical"] {
        width: 4px;
        height: 100%;
    }
`;

const SliderRange = styled(SliderPrimitive.Range)`
    position: absolute;
    border-radius: inherit;
    background-color: ${(p) => p.theme.colors.primary[2]};
    transition: background-color 0.3s;

    &[data-orientation="horizontal"] {
        height: 100%;
    }

    &[data-orientation="vertical"] {
        width: 100%;
    }
`;

const SliderThumb = styled(SliderPrimitive.Thumb)`
    display: block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${(p) => p.theme.colors.gray[0]};
    border: solid 2px ${(p) => p.theme.colors.primary[2]};
    transition: border-color 0.3s;
    cursor: pointer;

    &:focus {
        border-color: ${(p) => p.theme.colors.primary.base};
        box-shadow: 0 0 0 4px ${(p) => p.theme.colors.primary[2]};
        outline: none;
    }
`;

const SliderRoot = styled(SliderPrimitive.Root)`
    position: relative;
    display: flex;
    align-items: center;
    user-select: none;
    touch-action: none;
    cursor: pointer;
    ${margin}

    &[data-orientation="horizontal"] {
        width: 100%;
        height: 20px;
        ${width}
    }

    &[data-orientation="vertical"] {
        flex-direction: column;
        width: 20px;
        height: 100%;
        ${height}
    }

    &:not([data-disabled]):hover {
        ${SliderTrack} {
            background-color: ${(p) => p.theme.colors.gray[4]};
        }

        ${SliderRange} {
            background-color: ${(p) => p.theme.colors.primary.hover};
        }

        ${SliderThumb} {
            border-color: ${(p) => p.theme.colors.primary.hover};
        }
    }

    &[data-disabled] {
        &,
        ${SliderThumb} {
            cursor: not-allowed;
        }

        ${SliderRange} {
            background-color: ${(p) => p.theme.colors.disabled};
        }

        ${SliderThumb} {
            background-color: ${(p) => p.theme.colors.bg.component};
            border-color: ${(p) => p.theme.colors.disabled};
        }
    }
`;

export const Slider = forwardRef<HTMLElement, SliderProps>(({ onChange, ...rest }, ref) => {
    const value = rest.defaultValue ?? rest.value;
    const thumbs = Array.isArray(value) ? value : [value];

    return (
        <SliderRoot ref={ref} {...rest} onValueCommit={onChange}>
            <SliderTrack>
                <SliderRange />
            </SliderTrack>
            {thumbs.map((_: any, i: number) => (
                <SliderThumb key={i} />
            ))}
        </SliderRoot>
    );
});

if (process.env.NODE_ENV !== "production") {
    Slider.displayName = "Slider";
}
