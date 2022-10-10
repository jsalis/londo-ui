import { forwardRef } from "react";
import styled, { useTheme } from "styled-components";

import { useControllableState } from "../hooks";
import { CloseIcon } from "../icons";

import type { BoxProps } from "./box";
import { Box } from "./box";

export interface TagProps extends BoxProps {
    color: string;
    visible?: boolean;
    closable?: boolean;
    onClose?: (event: React.MouseEvent) => void;
    children?: React.ReactNode;
}

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
    "success",
    "danger",
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

export const Tag = forwardRef<HTMLDivElement, TagProps>((props, ref) => {
    const { color, closable = false, onClose, children, ...rest } = props;
    const isPresetColor = presetColors.includes(color);

    const theme: any = useTheme();
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

    const handleClose = (event: React.MouseEvent) => {
        event.stopPropagation();
        setVisible(false);
        onClose?.(event);
    };

    return (
        <StyledTag
            ref={ref}
            hidden={!visible}
            fontSize="sm"
            borderRadius="base"
            borderColor={getBorderColor()}
            color={getTextColor()}
            bg={getBackgroundColor()}
            {...rest}
        >
            {children}
            {closable ? <CloseIcon ml={1} cursor="pointer" onClick={handleClose} /> : null}
        </StyledTag>
    );
});

if (process.env.NODE_ENV !== "production") {
    Tag.displayName = "Tag";
}
