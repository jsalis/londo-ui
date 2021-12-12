import { Children, cloneElement, forwardRef, useState } from "react";
import PropTypes from "prop-types";

import { useDisclosure, useForkRef, useEventListener } from "../hooks";
import { WarningIcon } from "../icons";

import { Flex } from "./flex";
import { Box } from "./box";
import { Button } from "./button";
import { Popper } from "./popper";
import { ClickAwayListener } from "./click-away-listener";

const KeyCode = {
    ESC: 27,
};

export const Popconfirm = forwardRef((props, ref) => {
    const {
        title,
        placement,
        disabled,
        cancelText,
        okText,
        onConfirm,
        onCancel,
        onOpen,
        onClose,
        children,
        ...rest
    } = props;

    const { isOpen, close, toggle } = useDisclosure({ onOpen, onClose });

    const handleCancel = () => {
        close();
        onCancel?.();
    };

    const handleConfirm = () => {
        close();
        onConfirm?.();
    };

    const handleToggle = () => {
        if (!disabled) {
            toggle();
        }
    };

    const handleKeyDown = (event) => {
        if (event.keyCode === KeyCode.ESC && isOpen) {
            close();
        }
    };

    const [anchorNode, setAnchorNode] = useState(null);
    const child = Children.only(children);
    const anchor = cloneElement(child, {
        ref: useForkRef(child.ref, ref, setAnchorNode),
    });

    useEventListener("click", handleToggle, anchorNode);
    useEventListener("keydown", handleKeyDown, anchorNode);

    return (
        <ClickAwayListener onClickAway={() => close()}>
            <div>
                {anchor}
                <Popper anchor={anchorNode} isOpen={isOpen} placement={placement} keepMounted>
                    <Box
                        p={3}
                        maxWidth={400}
                        borderRadius="base"
                        boxShadow="base"
                        bg="popover.bg"
                        {...rest}
                    >
                        <Flex pb={2} align="flex-start">
                            <Box mr={2} flex="none">
                                <WarningIcon size={18} display="block" color="warning.base" />
                            </Box>
                            <Box lineHeight="base" color="heading">
                                {title}
                            </Box>
                        </Flex>
                        <Flex justify="flex-end">
                            <Button onClick={handleCancel}>{cancelText}</Button>
                            <Button onClick={handleConfirm}>{okText}</Button>
                        </Flex>
                    </Box>
                </Popper>
            </div>
        </ClickAwayListener>
    );
});

if (process.env.NODE_ENV !== "production") {
    Popconfirm.displayName = "Popconfirm";
    Popconfirm.propTypes = {
        title: PropTypes.node,
        placement: PropTypes.oneOf([
            "auto-end",
            "auto-start",
            "auto",
            "bottom-end",
            "bottom-start",
            "bottom",
            "left-end",
            "left-start",
            "left",
            "right-end",
            "right-start",
            "right",
            "top-end",
            "top-start",
            "top",
        ]),
        disabled: PropTypes.bool,
        cancelText: PropTypes.node,
        okText: PropTypes.node,
        onConfirm: PropTypes.func,
        onCancel: PropTypes.func,
        onOpen: PropTypes.func,
        onClose: PropTypes.func,
        className: PropTypes.string,
        children: PropTypes.node,
    };
}

Popconfirm.defaultProps = {
    title: "Are you sure?",
    placement: "top",
    cancelText: "Cancel",
    okText: "Ok",
};
