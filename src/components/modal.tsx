import { forwardRef, createContext, useContext, useRef, useEffect } from "react";
import { RemoveScroll } from "react-remove-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { suppressOthers } from "aria-hidden";
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
import { IconButton } from "./icon-button";

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

const ContentBox = motion(Flex);

const Overlay = forwardRef<HTMLDivElement, BoxProps>(({ color, ...rest }, ref) => {
    return <OverlayWrap ref={ref} bg="alpha.black.6" {...rest} color={color as any} />;
});

const Content = forwardRef<HTMLDivElement, ModalContentProps>((props, ref) => {
    const { onClose, onKeyDown, onClick, color, children, ...rest } = props;
    const { scrollBehavior, autoFocus, restoreFocus, initialFocusRef, finalFocusRef } =
        useContext(ModalContext);

    const contentRef = useRef<HTMLDivElement>(null);
    const mouseDownTarget = useRef<EventTarget | null>(null);

    useEffect(() => {
        if (contentRef.current) {
            // exclude toast container and floating elements
            const excludeNodes = document.querySelectorAll("[role='region'],[role='tooltip']");
            return suppressOthers([contentRef.current, ...excludeNodes]);
        }
        return;
    }, []);

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
                    ref={contentRef}
                    role="dialog"
                    justify="center"
                    align="flex-start"
                    overflow={scrollBehavior === "inside" ? "hidden" : "auto"}
                    tabIndex={-1}
                    aria-modal
                    onKeyDown={onKeyDown}
                    onMouseDown={onMouseDown}
                    onClick={onClickAway}
                >
                    <ContentBox
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
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: "easeInOut", duration: 0.2 }}
                        {...sectionProps}
                    >
                        {children}
                    </ContentBox>
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
            <IconButton
                ref={ref}
                type="button"
                variant="text"
                position="absolute"
                top="8px"
                right="8px"
                aria-label="Close"
                icon={<CloseIcon size={24} />}
                {...props}
            />
        );
    },
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
            <AnimatePresence>
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
            </AnimatePresence>
        </ModalContext.Provider>
    );
}

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

if (process.env.NODE_ENV !== "production") {
    Modal.displayName = "Modal";
}
