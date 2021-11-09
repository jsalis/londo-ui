import { memo, forwardRef } from "react";
import PropTypes from "prop-types";
import tinycolor from "tinycolor2";
import styled, { css } from "styled-components";
import { system, margin, layout } from "styled-system";

const other = system({
    pointerEvents: true,
    cursor: true,
});

const Swatch = styled.span`
    display: inline-block;
    position: relative;
    border-radius: 2px;
    border-color: transparent;
    box-shadow: ${(props) => props.theme.colors.alpha[1]} 0 0 0 1px inset;
    ${margin}
    ${layout}
    ${other}

    ${(p) =>
        p.primary &&
        css`
            &::before {
                border-width: ${Math.round(p.size / 4)}px;
                border-style: solid;
                border-color: ${p.accentColor} transparent transparent ${p.accentColor};
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
                border-width: ${Math.round(p.size / 6)}px;
                border-style: solid;
                border-color: transparent ${p.accentColor} ${p.accentColor} transparent;
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

export const ColorSwatch = memo(
    forwardRef((props, ref) => {
        const { color, primary, secondary, style, ...rest } = props;
        const accentColor = (primary || secondary) && tinycolor(color).isDark() ? "#fff" : "#000";
        return (
            <Swatch
                ref={ref}
                {...rest}
                primary={primary}
                secondary={secondary}
                accentColor={accentColor}
                style={{ backgroundColor: color, ...style }}
            />
        );
    })
);

ColorSwatch.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
};

ColorSwatch.defaultProps = {
    color: "#000000",
    size: 20,
};
