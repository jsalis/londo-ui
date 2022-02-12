import type { Strategy, Placement } from "@floating-ui/react-dom";
import { useFloating, getScrollParents, offset, flip, shift, size } from "@floating-ui/react-dom";
import { forwardRef, useLayoutEffect, useEffect } from "react";

import { useForkRef } from "../hooks";

import { Portal } from "./portal";

export interface FloaterProps {
    isOpen: boolean;
    anchor?: HTMLElement;
    container?: HTMLElement | (() => HTMLElement);
    keepMounted?: boolean;
    matchWidth?: boolean;
    strategy?: Strategy;
    placement?: Placement;
    offset?: number | { mainAxis?: number; crossAxis?: number };
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

export const Floater = forwardRef<HTMLElement, FloaterProps>(
    (
        {
            isOpen,
            anchor = null,
            container,
            keepMounted = false,
            matchWidth = false,
            strategy = "absolute",
            placement = "bottom",
            offset: offsetOptions = 8,
            style,
            children,
            ...rest
        },
        ref
    ) => {
        const { x, y, refs, reference, floating, update } = useFloating({
            strategy: strategy,
            placement: placement,
            middleware: [
                offset(offsetOptions),
                flip({ padding: 8 }),
                shift({ padding: 8 }),
                size({
                    apply({ reference }) {
                        if (matchWidth && refs.floating.current) {
                            Object.assign(refs.floating.current.style, {
                                width: `${reference.width}px`,
                            });
                        }
                    },
                }),
            ],
        });

        const ownRef = useForkRef(floating, ref);

        useLayoutEffect(() => reference(anchor), [anchor]);
        useLayoutEffect(() => update(), [isOpen, refs.floating.current]);

        useEffect(() => {
            if (!isOpen || !refs.reference.current || !refs.floating.current) {
                return;
            }

            const parents = [
                ...getScrollParents(refs.reference.current),
                ...getScrollParents(refs.floating.current),
            ];

            parents.forEach((el) => {
                el.addEventListener("scroll", update);
                el.addEventListener("resize", update);
            });

            return () => {
                parents.forEach((el) => {
                    el.removeEventListener("scroll", update);
                    el.removeEventListener("resize", update);
                });
            };
        }, [isOpen, refs.reference.current, refs.floating.current, update]);

        if (!keepMounted && !isOpen) {
            return null;
        }

        return (
            <Portal container={container}>
                <div
                    ref={ownRef}
                    role="tooltip"
                    {...rest}
                    style={{
                        position: strategy,
                        top: y ?? "",
                        left: x ?? "",
                        display: !isOpen && keepMounted ? "none" : "",
                        zIndex: 1,
                        ...style,
                    }}
                >
                    {children}
                </div>
            </Portal>
        );
    }
);

if (process.env.NODE_ENV !== "production") {
    Floater.displayName = "Floater";
}
