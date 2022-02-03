import type { MarginProps, LayoutProps } from "styled-system";
import { memo, forwardRef } from "react";
import { system, margin, layout } from "styled-system";
import styled, { css } from "styled-components";
import tinycolor from "tinycolor2";

export interface ColorSwatchProps
    extends React.HTMLAttributes<HTMLSpanElement>,
        MarginProps,
        LayoutProps {
    color?: string;
    size?: number;
    primary?: boolean;
    secondary?: boolean;
}

interface StyledColorSwatchProps extends ColorSwatchProps {
    accentColor: string;
}

const other = system({
    pointerEvents: true,
    cursor: true,
});

const Swatch = styled.span<StyledColorSwatchProps>`
    --accent-color: ${(p) => p.accentColor};
    display: inline-block;
    position: relative;
    border-radius: 2px;
    border-color: transparent;
    box-shadow: ${(p) => p.theme.colors.alpha[3]} 0 0 0 1px inset;
    ${margin}
    ${layout}
    ${other}

    ${(p) =>
        p.primary &&
        css`
            &::before {
                border-width: ${Math.round((p.size ?? 0) / 4)}px;
                border-style: solid;
                border-color: var(--accent-color) transparent transparent var(--accent-color);
                border-radius: 2px 0 0 0;
                transform: translate(1px, 1px);
                position: absolute;
                top: 0;
                left: 0;
                z-index: 1;
                content: "";
            }
        `}

    ${(p) =>
        p.secondary &&
        css`
            &::after {
                border-width: ${Math.round((p.size ?? 0) / 6)}px;
                border-style: solid;
                border-color: transparent var(--accent-color) var(--accent-color) transparent;
                border-radius: 0 0 2px 0;
                transform: translate(-1px, -1px);
                position: absolute;
                bottom: 0;
                right: 0;
                z-index: 1;
                content: "";
            }
        `}
`;

const BaseColorSwatch = forwardRef<HTMLSpanElement, ColorSwatchProps>(
    ({ color = "#000000", primary, secondary, size = 20, style, ...rest }, ref) => {
        const accentColor = (primary || secondary) && tinycolor(color).isDark() ? "#fff" : "#000";
        return (
            <Swatch
                ref={ref}
                {...rest}
                primary={primary}
                secondary={secondary}
                size={size}
                accentColor={accentColor}
                style={{ backgroundColor: color, ...style }}
            />
        );
    }
);

export const ColorSwatch = memo(BaseColorSwatch);

if (process.env.NODE_ENV !== "production") {
    ColorSwatch.displayName = "ColorSwatch";
}
