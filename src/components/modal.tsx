import React, { forwardRef, createContext, useContext, useRef } from "react";
import { RemoveScroll } from "react-remove-scroll";
import styled from "styled-components";

import { useCallbackRef, useForkHandler } from "../hooks";
import { CloseIcon } from "../icons";
import { KeyCode } from "../utils/key-code";

import type { FlexProps } from "./flex";
import type { BoxProps } from "./box";
import { Flex } from "./flex";
import { Box } from "./box";
import { Portal } from "./portal";
import { FocusLock } from "./focus-lock";
import { VisuallyHidden } from "./visually-hidden";

interface ModalContextValue {
    scrollBehavior?: "inside" | "outside";
    autoFocus?: boolean;
    restoreFocus?: boolean;
    initialFocusRef?: React.RefObject<any>;
    finalFocusRef?: React.RefObject<any>;
}

interface ModalContentProps extends FlexProps {
    onClick?: (event: React.MouseEvent) => void;
    onClose?: (event: React.MouseEvent) => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
}

export interface ModalHeaderProps extends BoxProps {}
export interface ModalBodyProps extends BoxProps {}
export interface ModalFooterProps extends FlexProps {}

export interface ModalProps extends ModalContextValue, FlexProps {
    isOpen: boolean;
    onClose: () => void;
    overlayRef?: React.RefObject<any>;
    contentRef?: React.RefObject<any>;
    container?: HTMLElement | (() => HTMLElement);
}

const ModalContext = createContext<ModalContextValue>({} as ModalContextValue);

const OverlayWrap = styled(Box)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1;
`;

const ContentWrap = styled(Flex)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1;
`;

const CloseButtonWrap = styled.button`
    width: 32px;
    height: 32px;
    position: absolute;
    top: 8px;
    right: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    background: transparent;
    border: none;
    border-radius: ${(p) => p.theme.radii.base}px;
    transition: box-shadow 0.2s, background 0.2s;
    outline: 0;
    cursor: pointer;

    &:active,
    &:focus {
        box-shadow: 0 0 0 2px ${(p) => p.theme.colors.primary[2]};
    }

    &:hover {
        background: ${(p) => p.theme.colors.alpha[1]};
    }

    &:active {
        background: ${(p) => p.theme.colors.alpha[0]};
    }
`;

const Overlay = forwardRef<HTMLDivElement, BoxProps>(({ color, ...rest }, ref) => {
    return <OverlayWrap ref={ref} bg="alpha.black.6" {...rest} color={color as any} />;
});

const Content = forwardRef<HTMLDivElement, ModalContentProps>((props, ref) => {
    const { onClose, onKeyDown, onClick, color, children, ...rest } = props;
    const { scrollBehavior, autoFocus, restoreFocus, initialFocusRef, finalFocusRef } =
        useContext(ModalContext);

    const mouseDownTarget = useRef<EventTarget | null>(null);

    const onMouseDown = (event: React.MouseEvent) => {
        mouseDownTarget.current = event.target;
    };

    const onClickAway = (event: React.MouseEvent) => {
        if (mouseDownTarget.current === event.target) {
            onClose?.(event);
        }
    };

    const onActivation = useCallbackRef(() => {
        initialFocusRef?.current?.focus();
    });

    const onDeactivation = useCallbackRef(() => {
        finalFocusRef?.current?.focus();
    });

    const sectionProps = {
        onClick: useForkHandler(onClick, (e: React.MouseEvent) => e.stopPropagation()),
        ...rest,
    };

    return (
        <FocusLock
            autoFocus={autoFocus}
            returnFocus={restoreFocus && !finalFocusRef}
            onActivation={onActivation}
            onDeactivation={onDeactivation}
        >
            <RemoveScroll>
                <ContentWrap
                    justify="center"
                    align="flex-start"
                    overflow={scrollBehavior === "inside" ? "hidden" : "auto"}
                    tabIndex={-1}
                    role="dialog"
                    aria-modal
                    onKeyDown={onKeyDown}
                    onMouseDown={onMouseDown}
                    onClick={onClickAway}
                >
                    <Flex
                        ref={ref}
                        as="section"
                        direction="column"
                        position="relative"
                        borderRadius="base"
                        boxShadow="base"
                        bg="modal.bg"
                        pointerEvents="initial"
                        my={5}
                        width={1}
                        maxWidth={448}
                        maxHeight={scrollBehavior === "inside" ? "calc(100% - 128px)" : ""}
                        color={color as any}
                        {...sectionProps}
                    >
                        {children}
                    </Flex>
                </ContentWrap>
            </RemoveScroll>
        </FocusLock>
    );
});

const Header = forwardRef<HTMLElement, ModalHeaderProps>(({ color = "heading", ...rest }, ref) => {
    return <Box ref={ref} as="header" flex={0} fontSize={3} p={3} color={color as any} {...rest} />;
});

const Body = forwardRef<HTMLElement, ModalBodyProps>(({ color, ...rest }, ref) => {
    const { scrollBehavior } = useContext(ModalContext);
    const overflow = scrollBehavior === "inside" ? "auto" : "";
    return (
        <Box
            ref={ref}
            flex={1}
            lineHeight="base"
            pt={2}
            pb={3}
            px={3}
            overflow={overflow}
            color={color as any}
            {...rest}
        />
    );
});

const Footer = forwardRef<HTMLElement, ModalFooterProps>(({ color, ...rest }, ref) => {
    return (
        <Flex
            ref={ref}
            as="footer"
            justify="flex-end"
            align="center"
            flex={0}
            gap={2}
            p={3}
            color={color as any}
            {...rest}
        />
    );
});

const CloseButton = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
    (props, ref) => {
        return (
            <CloseButtonWrap ref={ref} type="button" {...props}>
                <VisuallyHidden>Close</VisuallyHidden>
                <CloseIcon size={24} aria-hidden />
            </CloseButtonWrap>
        );
    }
);

export function Modal({
    isOpen,
    onClose,
    scrollBehavior = "outside",
    autoFocus = true,
    restoreFocus = true,
    initialFocusRef,
    finalFocusRef,
    overlayRef,
    contentRef,
    container,
    className,
    children,
    ...rest
}: ModalProps) {
    const context = { scrollBehavior, autoFocus, restoreFocus, initialFocusRef, finalFocusRef };

    const handleClose = (event: React.SyntheticEvent | Event) => {
        event.stopPropagation();
        onClose?.();
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === KeyCode.ESC) {
            event.stopPropagation();
            onClose?.();
        }
    };

    return (
        <ModalContext.Provider value={context}>
            {isOpen ? (
                <Portal container={container}>
                    <Overlay ref={overlayRef} />
                    <Content
                        ref={contentRef}
                        {...rest}
                        className={className}
                        onClose={handleClose}
                        onKeyDown={handleKeyDown}
                    >
                        <CloseButton onClick={handleClose} />
                        {children}
                    </Content>
                </Portal>
            ) : null}
        </ModalContext.Provider>
    );
}

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

if (process.env.NODE_ENV !== "production") {
    Modal.displayName = "Modal";
}
