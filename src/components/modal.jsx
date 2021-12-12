import { forwardRef, createContext, useContext } from "react";
import { RemoveScroll } from "react-remove-scroll";
import FocusLock from "react-focus-lock";
import PropTypes from "prop-types";
import styled from "styled-components";

import { HTMLElementType } from "../utils/prop-types";
import { useCallbackRef } from "../hooks";
import { CloseIcon } from "../icons";

import { Portal } from "./portal";
import { Flex } from "./flex";
import { Box } from "./box";
import { ClickAwayListener } from "./click-away-listener";
import { VisuallyHidden } from "./visually-hidden";

const ModalContext = createContext(undefined);

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
    transition: box-shadow 0.2s;
    outline: 0;
    cursor: pointer;

    &:active,
    &:focus {
        box-shadow: 0 0 0 3px ${(p) => p.theme.colors.primary[2]};
    }

    &:hover {
        background: ${(p) => p.theme.colors.alpha[1]};
    }

    &:active {
        background: ${(p) => p.theme.colors.alpha[0]};
    }
`;

const Overlay = forwardRef((props, ref) => {
    return <OverlayWrap ref={ref} bg="alpha.black.6" {...props} />;
});

const Content = forwardRef((props, ref) => {
    const { onClose, onKeyDown, children, ...rest } = props;
    const { scrollBehavior, autoFocus, restoreFocus, initialFocusRef, finalFocusRef } =
        useContext(ModalContext);

    const onActivation = useCallbackRef(() => {
        initialFocusRef?.current?.focus();
    });

    const onDeactivation = useCallbackRef(() => {
        finalFocusRef?.current?.focus();
    });

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
                >
                    <ClickAwayListener onClickAway={onClose}>
                        <Flex
                            ref={ref}
                            as="section"
                            direction="column"
                            position="relative"
                            borderRadius="base"
                            boxShadow="base"
                            bg="popover.bg"
                            my={5}
                            width={1}
                            maxWidth={448}
                            maxHeight={scrollBehavior === "inside" ? "calc(100% - 128px)" : ""}
                            {...rest}
                        >
                            {children}
                        </Flex>
                    </ClickAwayListener>
                </ContentWrap>
            </RemoveScroll>
        </FocusLock>
    );
});

const Header = forwardRef((props, ref) => {
    return <Box ref={ref} as="header" flex={0} fontSize={3} p={3} color="heading" {...props} />;
});

const Body = forwardRef((props, ref) => {
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
            {...props}
        />
    );
});

const Footer = forwardRef((props, ref) => {
    return (
        <Flex
            ref={ref}
            as="footer"
            justify="flex-end"
            align="center"
            flex={0}
            gap={3}
            p={3}
            {...props}
        />
    );
});

const CloseButton = forwardRef((props, ref) => {
    return (
        <CloseButtonWrap ref={ref} type="button" {...props}>
            <VisuallyHidden>Close</VisuallyHidden>
            <CloseIcon size={24} aria-hidden />
        </CloseButtonWrap>
    );
});

export function Modal(props) {
    const {
        isOpen,
        onClose,
        scrollBehavior,
        autoFocus,
        restoreFocus,
        initialFocusRef,
        finalFocusRef,
        overlayRef,
        contentRef,
        container,
        className,
        children,
        ...rest
    } = props;

    const context = { scrollBehavior, autoFocus, restoreFocus, initialFocusRef, finalFocusRef };

    const handleClose = (event) => {
        event.stopPropagation();
        onClose?.();
    };

    const handleKeyDown = (event) => {
        if (event.key === "Escape") {
            event.stopPropagation();
            onClose?.();
        }
    };

    return (
        <ModalContext.Provider value={context}>
            {isOpen && (
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
            )}
        </ModalContext.Provider>
    );
}

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

if (process.env.NODE_ENV !== "production") {
    Modal.displayName = "Modal";
    Modal.propTypes = {
        isOpen: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,
        scrollBehavior: PropTypes.oneOf(["inside", "outside"]),
        autoFocus: PropTypes.bool,
        restoreFocus: PropTypes.bool,
        initialFocusRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        finalFocusRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        overlayRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        contentRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        container: PropTypes.oneOfType([HTMLElementType, PropTypes.func]),
        className: PropTypes.string,
        children: PropTypes.node,
    };
}

Modal.defaultProps = {
    scrollBehavior: "outside",
    autoFocus: true,
    restoreFocus: true,
};
