import { Children, isValidElement, cloneElement, forwardRef, useRef } from "react";

import { useForkRef, useForkHandler } from "../hooks";

import type { BoxProps } from "./box";
import type { FloaterProps } from "./floater";
import { Box } from "./box";
import { Floater } from "./floater";
import { ClickAwayListener } from "./click-away-listener";

export interface DropdownProps extends BoxProps {
    overlay?: React.ReactNode;
    placement?: FloaterProps["placement"];
    isOpen: boolean;
    onOpen?: () => void;
    onClose?: () => void;
    disabled?: boolean;
    keepMounted?: boolean;
    matchWidth?: boolean;
    children?: React.ReactNode;
}

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
    (
        {
            overlay,
            placement = "bottom-start",
            isOpen,
            onOpen,
            onClose,
            disabled,
            keepMounted = true,
            matchWidth = true,
            color,
            children,
            ...rest
        },
        ref
    ) => {
        const handleClick = () => {
            if (!disabled) {
                if (isOpen) {
                    onClose?.();
                } else {
                    onOpen?.();
                }
            }
        };

        const handleClickAway = () => {
            if (isOpen) {
                onClose?.();
            }
        };

        const child = Children.only(children);
        const anchorRef = useRef<HTMLElement>();
        const childProps = {
            ref: useForkRef((child as any).ref, anchorRef),
            onClick: useForkHandler((child as any).props.onClick, handleClick),
        };

        const anchor = isValidElement(child) ? cloneElement(child, childProps) : child;

        return (
            <ClickAwayListener onClickAway={handleClickAway}>
                <div>
                    {anchor}
                    <Floater
                        ref={ref}
                        offset={4}
                        anchor={anchorRef.current}
                        isOpen={isOpen}
                        placement={placement}
                        keepMounted={keepMounted}
                        matchWidth={matchWidth}
                        onMouseDown={(e: React.MouseEvent) => e.preventDefault()}
                    >
                        <Box
                            py={1}
                            borderRadius="base"
                            boxShadow="base"
                            bg="dropdown.bg"
                            color={color as any}
                            {...rest}
                        >
                            {overlay}
                        </Box>
                    </Floater>
                </div>
            </ClickAwayListener>
        );
    }
);

if (process.env.NODE_ENV !== "production") {
    Dropdown.displayName = "Dropdown";
}
