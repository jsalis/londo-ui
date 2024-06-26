import type { LayoutProps } from "styled-system";
import { memo, forwardRef, useRef, useMemo, useEffect } from "react";
import { layout } from "styled-system";
import styled from "styled-components";

import { useCallbackRef, useHexColor } from "../hooks";
import { clamp, round } from "../utils/math-util";
import { hsvaToHslString } from "../utils/color-util";
import { KeyCode } from "../utils/key-code";

import type { FlexProps } from "./flex";
import { Flex } from "./flex";

type HsvaColor = { h: number; s: number; v: number; a: number };

interface InteractiveProps {
    onMove?: (offset: { left: number; top: number }) => void;
    onKey?: (offset: { left: number; top: number }) => void;
    children?: React.ReactNode;
}

interface PointerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">, LayoutProps {
    color?: string;
    left?: number;
    top?: number;
}

export interface ColorSaturationProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
    hsva: HsvaColor;
    onChange?: (color: any) => void;
}

export interface ColorHueProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
    hue: number;
    onChange?: (color: any) => void;
}

export interface ColorPickerProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
        FlexProps {
    color?: string;
    onChange?: (color: any) => void;
}

const PointerFill = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    border-radius: inherit;
    content: "";
`;

const PointerWrap = styled.div`
    position: absolute;
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border: 2px solid #fff;
    border-radius: 2px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 1;
    ${layout}
`;

const InteractiveWrap = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    outline: none;
    touch-action: none;

    &:focus ${PointerWrap} {
        transform: translate(-50%, -50%) scale(1.1);
    }
`;

const SaturationWrap = styled.div`
    position: relative;
    flex-grow: 1;
    border-color: transparent;
    border-bottom: 12px solid #000;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.05);
    background-image: linear-gradient(to top, #000, rgba(0, 0, 0, 0)),
        linear-gradient(to right, #fff, rgba(255, 255, 255, 0));
`;

const HueWrap = styled.div`
    position: relative;
    height: 24px;
    background: linear-gradient(
        to right,
        #f00 0%,
        #ff0 17%,
        #0f0 33%,
        #0ff 50%,
        #00f 67%,
        #f0f 83%,
        #f00 100%
    );
    ${layout}
`;

const PickerWrap = styled(Flex)`
    & > :first-child {
        border-radius: 2px 2px 0 0;
    }

    & > :last-child {
        border-radius: 0 0 2px 2px;
    }
`;

function getRelativePosition(el: HTMLElement, event: MouseEvent) {
    const rect = el.getBoundingClientRect();
    return {
        left: clamp((event.pageX - (rect.left + window.scrollX)) / rect.width),
        top: clamp((event.pageY - (rect.top + window.scrollY)) / rect.height),
    };
}

const Interactive = memo(({ onMove, onKey, ...rest }: InteractiveProps) => {
    const onMoveCallback = useCallbackRef(onMove);
    const onKeyCallback = useCallbackRef(onKey);
    const container = useRef<HTMLDivElement>(null);

    const [handleMoveStart, handleKeyDown, toggleDocumentEvents] = useMemo(() => {
        const handleMoveStart = (event: React.MouseEvent) => {
            const { nativeEvent } = event;
            const el = container.current;

            if (el) {
                nativeEvent.preventDefault();
                el.focus();
                const pos = getRelativePosition(el, nativeEvent);
                onMoveCallback(pos);
                toggleDocumentEvents(true);
            }
        };

        const handleMove = (event: MouseEvent) => {
            event.preventDefault();

            // If user moves the pointer outside of the window bounds and releases it there,
            // `mouseup` won't be fired. In order to stop the picker from following the cursor
            // after the user has moved the mouse back to the document, we check `event.buttons`.
            // It allows us to detect that the user is just moving the mouse without pressing it down.
            const isDown = event.buttons > 0;

            if (isDown && container.current) {
                const pos = getRelativePosition(container.current, event);
                onMoveCallback(pos);
            } else {
                toggleDocumentEvents(false);
            }
        };

        const handleMoveEnd = () => {
            toggleDocumentEvents(false);
        };

        const handleKeyDown = (event: React.KeyboardEvent) => {
            const key = event.key;

            if (key.startsWith("Arrow")) {
                event.preventDefault();
                onKeyCallback({
                    left: key === KeyCode.RIGHT ? 0.05 : key === KeyCode.LEFT ? -0.05 : 0,
                    top: key === KeyCode.DOWN ? 0.05 : key === KeyCode.UP ? -0.05 : 0,
                });
            }
        };

        const toggleDocumentEvents = (state?: boolean) => {
            const toggleEvent = state ? window.addEventListener : window.removeEventListener;
            toggleEvent("mousemove", handleMove);
            toggleEvent("mouseup", handleMoveEnd);
        };

        return [handleMoveStart, handleKeyDown, toggleDocumentEvents];
    }, []);

    // remove window event listeners before unmounting
    useEffect(() => toggleDocumentEvents, [toggleDocumentEvents]);

    return (
        <InteractiveWrap
            {...rest}
            ref={container}
            onMouseDown={handleMoveStart}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="slider"
        />
    );
});

const Pointer = ({ color, left = 0, top = 0.5, ...rest }: PointerProps) => {
    return (
        <PointerWrap {...rest} style={{ top: `${top * 100}%`, left: `${left * 100}%` }}>
            <PointerFill style={{ backgroundColor: color }} />
        </PointerWrap>
    );
};

const Saturation = memo(
    forwardRef<HTMLDivElement, ColorSaturationProps>(({ hsva, onChange, ...rest }, ref) => {
        const color = hsvaToHslString({ h: hsva.h, s: 100, v: 100, a: 1 });

        const handleMove = (offset: { left: number; top: number }) => {
            onChange?.({
                s: offset.left * 100,
                v: 100 - offset.top * 100,
            });
        };

        const handleKey = (offset: { left: number; top: number }) => {
            // saturation and brightness always fit into [0, 100] range
            onChange?.({
                s: clamp(hsva.s + offset.left * 100, 0, 100),
                v: clamp(hsva.v - offset.top * 100, 0, 100),
            });
        };

        return (
            <SaturationWrap ref={ref} {...rest} style={{ backgroundColor: color }}>
                <Interactive
                    onMove={handleMove}
                    onKey={handleKey}
                    aria-label="Color"
                    aria-valuetext={`Saturation ${round(hsva.s)}%, Brightness ${round(hsva.v)}%`}
                >
                    <Pointer
                        top={1 - hsva.v / 100}
                        left={hsva.s / 100}
                        color={hsvaToHslString(hsva)}
                    />
                </Interactive>
            </SaturationWrap>
        );
    }),
);

const Hue = memo(
    forwardRef<HTMLDivElement, ColorHueProps>(({ hue, onChange, ...rest }, ref) => {
        const handleMove = (offset: { left: number; top: number }) => {
            onChange?.({ h: 360 * offset.left });
        };

        const handleKey = (offset: { left: number; top: number }) => {
            // hue measured in degrees of the color circle ranging from 0 to 360
            onChange?.({ h: clamp(hue + offset.left * 360, 0, 360) });
        };

        return (
            <HueWrap ref={ref} {...rest}>
                <Interactive
                    onMove={handleMove}
                    onKey={handleKey}
                    aria-label="Hue"
                    aria-valuetext={round(hue)}
                >
                    <Pointer
                        left={hue / 360}
                        color={hsvaToHslString({ h: hue, s: 100, v: 100, a: 1 })}
                        height="100%"
                    />
                </Interactive>
            </HueWrap>
        );
    }),
);

const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
    ({ color = "#000000", size = 160, onChange, ...rest }, ref) => {
        const [hsva, updateHsva] = useHexColor(color, onChange);
        return (
            <PickerWrap
                ref={ref}
                position="relative"
                flexDirection="column"
                flex="none"
                userSelect="none"
                cursor="default"
                size={size}
                {...rest}
            >
                <Saturation hsva={hsva} onChange={updateHsva} />
                <Hue hue={hsva.h} onChange={updateHsva} />
            </PickerWrap>
        );
    },
);

const CompoundColorPicker = Object.assign(ColorPicker, {
    Saturation,
    Hue,
});

export { CompoundColorPicker as ColorPicker };

if (process.env.NODE_ENV !== "production") {
    ColorPicker.displayName = "ColorPicker";
}
