import type { Placement, Strategy } from "@floating-ui/react-dom";
import {
    Children,
    isValidElement,
    cloneElement,
    forwardRef,
    useState,
    useEffect,
    useLayoutEffect,
} from "react";
import { useFloating, autoUpdate, offset, flip, shift, size } from "@floating-ui/react-dom";

import { useForkRef, useForkHandler } from "../hooks";

import type { BoxProps } from "./box";
import { Box } from "./box";
import { Portal } from "./portal";
import { ClickAwayListener } from "./click-away-listener";
import { getTransformOrigin } from "../utils/floating-util";

export interface DropdownProps extends BoxProps {
    overlay?: React.ReactNode;
    placement?: Placement;
    strategy?: Strategy;
    isOpen: boolean;
    onOpen?: () => void;
    onClose?: () => void;
    disabled?: boolean;
    keepMounted?: boolean;
    matchWidth?: boolean;
    container?: HTMLElement | (() => HTMLElement);
    children?: React.ReactNode;
}

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
    (
        {
            overlay,
            placement = "bottom-start",
            strategy = "absolute",
            isOpen,
            onOpen,
            onClose,
            disabled,
            keepMounted = true,
            matchWidth = true,
            color,
            container,
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

        const [anchorNode, setAnchorNode] = useState<HTMLElement | null>(null);
        const child = Children.only(children);
        const childProps = {
            ref: useForkRef((child as any).ref, setAnchorNode),
            onClick: useForkHandler((child as any).props.onClick, handleClick),
        };

        const anchor = isValidElement(child) ? cloneElement(child, childProps) : child;

        const middleware = [
            offset(4),
            flip({ padding: 8 }),
            shift({ padding: 8 }),
            size({
                apply({ rects, elements }) {
                    if (matchWidth) {
                        Object.assign(elements.floating.style, {
                            width: `${rects.reference.width}px`,
                        });
                    }
                },
            }),
        ];

        const {
            x,
            y,
            refs,
            reference,
            floating,
            update,
            placement: autoPlacement,
        } = useFloating({
            strategy,
            placement,
            middleware,
        });

        useLayoutEffect(() => reference(anchorNode), [anchorNode]);
        useLayoutEffect(() => update(), [isOpen, refs.floating.current]);

        useEffect(() => {
            if (isOpen && refs.reference.current && refs.floating.current) {
                return autoUpdate(refs.reference.current, refs.floating.current, update);
            }
            return;
        }, [isOpen, refs.reference.current, refs.floating.current, update]);

        return (
            <ClickAwayListener onClickAway={handleClickAway}>
                <div>
                    {anchor}
                    {isOpen || keepMounted ? (
                        <Portal container={container}>
                            <div
                                ref={floating}
                                role="tooltip"
                                style={{
                                    position: strategy,
                                    top: y ?? "",
                                    left: x ?? "",
                                    transformOrigin: getTransformOrigin(autoPlacement),
                                    display: !isOpen && keepMounted ? "none" : "",
                                    zIndex: 1,
                                }}
                                onMouseDown={(e: React.MouseEvent) => e.preventDefault()}
                            >
                                <Box
                                    ref={ref}
                                    py={1}
                                    borderRadius="base"
                                    boxShadow="base"
                                    bg="dropdown.bg"
                                    color={color as any}
                                    {...rest}
                                >
                                    {overlay}
                                </Box>
                            </div>
                        </Portal>
                    ) : null}
                </div>
            </ClickAwayListener>
        );
    }
);

if (process.env.NODE_ENV !== "production") {
    Dropdown.displayName = "Dropdown";
}
