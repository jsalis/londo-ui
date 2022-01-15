import { forwardRef } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import { useDisclosure, useControllableState, useForkHandler } from "../hooks";
import { ChevronDownIcon } from "../icons";
import { KeyCode } from "../utils/key-code";

import { Input } from "./input";
import { Dropdown } from "./dropdown";
import { Scroller } from "./scroller";
import { Flex } from "./flex";

const Option = styled.div`
    padding: 4px;
    flex: auto;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;

    &:hover,
    &:active {
        color: ${(p) => p.theme.colors.gray[9]};
        background: ${(p) => p.theme.colors.alpha[1]};
    }

    ${(p) =>
        p.selected &&
        css`
            &,
            &:hover {
                color: ${p.theme.colors.primary.base};
                background: ${p.theme.colors.gray[1]};
            }
        `}
`;

export const Select = forwardRef((props, ref) => {
    const {
        options,
        value,
        defaultValue,
        onChange,
        onOpen,
        onClose,
        onBlur,
        onKeyDown,
        disabled,
        className,
        ...rest
    } = props;

    const { isOpen, open, close } = useDisclosure({ onOpen, onClose });
    const [selectedValue, setSelectedValue] = useControllableState(value, defaultValue);
    const selectedOption = options.find((opt) => opt.value === selectedValue);

    const handleKeyDown = (event) => {
        if (event.key === KeyCode.ENTER) {
            open();
        } else if (event.key === KeyCode.ESC) {
            event.stopPropagation();
            close();
        }
    };

    const handleSelect = (val) => {
        setSelectedValue(val);
        onChange?.(val);
        close();
    };

    const inputProps = {
        onBlur: useForkHandler(onBlur, close),
        onKeyDown: useForkHandler(onKeyDown, handleKeyDown),
        disabled,
        ...rest,
    };

    const overlay = (
        <Scroller maxHeight={256}>
            {options.length > 0 ? (
                options.map((opt) => (
                    <Option
                        key={opt.value}
                        onClick={() => handleSelect(opt.value)}
                        selected={selectedOption?.value === opt.value}
                    >
                        {opt.children ?? opt.label}
                    </Option>
                ))
            ) : (
                <Flex p={1} align="center" justify="center" color="placeholder">
                    No Data
                </Flex>
            )}
        </Scroller>
    );

    return (
        <Dropdown
            overlay={overlay}
            isOpen={isOpen}
            onOpen={open}
            onClose={close}
            disabled={disabled}
        >
            <Input.Group className={className}>
                <Input
                    ref={ref}
                    value={selectedOption?.label ?? ""}
                    role="combobox"
                    cursor="pointer"
                    readOnly
                    {...inputProps}
                />
                <Input.Suffix>
                    <ChevronDownIcon />
                </Input.Suffix>
            </Input.Group>
        </Dropdown>
    );
});

if (process.env.NODE_ENV !== "production") {
    Select.displayName = "Select";
    Select.propTypes = {
        options: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.node.isRequired,
                label: PropTypes.string.isRequired,
                children: PropTypes.node,
            })
        ),
        value: PropTypes.any,
        defaultValue: PropTypes.any,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onKeyDown: PropTypes.func,
        onOpen: PropTypes.func,
        onClose: PropTypes.func,
        disabled: PropTypes.bool,
        className: PropTypes.string,
    };
}

Select.defaultProps = {
    options: [],
};
