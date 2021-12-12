import { forwardRef } from "react";
import PropTypes from "prop-types";
import styled, { useTheme } from "styled-components";

import { useControllableState } from "../hooks";
import { CloseIcon } from "../icons";

import { Box } from "./box";

const presetColors = [
    "magenta",
    "red",
    "volcano",
    "orange",
    "gold",
    "yellow",
    "lime",
    "green",
    "cyan",
    "blue",
    "geekblue",
    "purple",
    "primary",
    "positive",
    "negative",
    "warning",
    "info",
];

const StyledTag = styled(Box)`
    display: inline-flex;
    vertical-align: top;
    align-items: center;
    max-width: 100%;
    min-height: 20px;
    padding: 0 8px;
    white-space: nowrap;
    border-width: 1px;
    border-style: solid;
    transition: all 0.3s;
`;

export const Tag = forwardRef((props, ref) => {
    const { color, closable, onClose, className, children, ...rest } = props;
    const isPresetColor = presetColors.includes(color);

    const theme = useTheme();
    const [visible, setVisible] = useControllableState(props.visible, true);

    const getBorderColor = () => {
        if (isPresetColor) {
            return theme.colors[color][1];
        }
        if (color) {
            return "transparent";
        }
        return theme.colors.border.base;
    };

    const getTextColor = () => {
        if (isPresetColor) {
            return theme.colors[color].base;
        }
        if (color) {
            return "white";
        }
        return undefined;
    };

    const getBackgroundColor = () => {
        if (isPresetColor) {
            return theme.colors[color][0];
        }
        if (color) {
            return color;
        }
        return theme.colors.gray[1];
    };

    const handleClose = (event) => {
        event.stopPropagation();
        setVisible(false);
        onClose?.(event);
    };

    return (
        <StyledTag
            ref={ref}
            className={className}
            hidden={!visible}
            fontSize="sm"
            borderRadius="base"
            borderColor={getBorderColor()}
            color={getTextColor()}
            bg={getBackgroundColor()}
            {...rest}
        >
            {children}
            {closable && <CloseIcon ml={1} cursor="pointer" onClick={handleClose} />}
        </StyledTag>
    );
});

if (process.env.NODE_ENV !== "production") {
    Tag.displayName = "Tag";
    Tag.propTypes = {
        color: PropTypes.string,
        visible: PropTypes.bool,
        closable: PropTypes.bool,
        onClose: PropTypes.func,
        className: PropTypes.string,
        children: PropTypes.node,
    };
}

Tag.defaultProps = {
    closable: false,
};
