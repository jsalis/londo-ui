import { forwardRef } from "react";
import { RemoveScroll } from "react-remove-scroll";
import PropTypes from "prop-types";
import styled from "styled-components";

import { HTMLElementType } from "../utils/prop-types";
import { CloseIcon } from "../icons";

import { Portal } from "./portal";
import { Flex } from "./flex";
import { Box } from "./box";
import { ClickAwayListener } from "./click-away-listener";
import { VisuallyHidden } from "./visually-hidden";

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
    overflow: auto;
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
    const { onClickAway, children, ...rest } = props;
    return (
        <RemoveScroll>
            <ContentWrap
                justify="center"
                align="flex-start"
                tabIndex={-1}
                role="dialog"
                aria-modal
                {...rest}
            >
                <ClickAwayListener onClickAway={onClickAway}>
                    <Flex
                        ref={ref}
                        as="section"
                        direction="column"
                        position="relative"
                        borderRadius="base"
                        boxShadow="base"
                        bg="popover.bg"
                        width={1}
                        maxWidth={448}
                        my={5}
                    >
                        {children}
                    </Flex>
                </ClickAwayListener>
            </ContentWrap>
        </RemoveScroll>
    );
});

const Header = forwardRef((props, ref) => {
    return <Box ref={ref} as="header" flex={0} fontSize={3} p={3} color="heading" {...props} />;
});

const Body = forwardRef((props, ref) => {
    return <Box ref={ref} flex={1} lineHeight="base" pt={2} pb={3} px={3} {...props} />;
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
        keepMounted,
        container,
        overlayRef,
        contentRef,
        className,
        children,
        ...rest
    } = props;

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

    if (!keepMounted && !isOpen) {
        return null;
    }

    return (
        <Portal container={container}>
            <Overlay ref={overlayRef} />
            <Content
                ref={contentRef}
                className={className}
                onClickAway={handleClose}
                onKeyDown={handleKeyDown}
                {...rest}
            >
                <CloseButton onClick={handleClose} />
                {children}
            </Content>
        </Portal>
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
        // scrollBehavior: PropTypes.oneOf(["inside", "outside"]),
        keepMounted: PropTypes.bool,
        container: PropTypes.oneOfType([HTMLElementType, PropTypes.func]),
        overlayRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        contentRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        className: PropTypes.string,
        children: PropTypes.node,
    };
}

Modal.defaultProps = {
    // scrollBehavior: "outside",
    keepMounted: false,
};
