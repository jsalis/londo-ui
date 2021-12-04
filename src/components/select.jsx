import { forwardRef } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import { useDisclosure, useControllableState, useForkHandler } from "../hooks";
import { ChevronDownIcon } from "../icons";

import { Input } from "./input";
import { Dropdown } from "./dropdown";
import { Scroller } from "./scroller";

const Option = styled.div`
    padding: 4px;
    flex: auto;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;

    &:hover {
        color: ${(p) => p.theme.colors.gray[9]};
        background: ${(p) => p.theme.colors.gray[4]};
    }

    &:active {
        color: ${(p) => p.theme.colors.gray[9]};
        background: ${(p) => p.theme.colors.gray[1]};
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
        disabled,
        className,
        ...rest
    } = props;

    const { isOpen, open, close } = useDisclosure({ onOpen, onClose });
    const [selectedValue, setSelectedValue] = useControllableState(value, defaultValue);
    const selectedOption = options?.find((opt) => opt.value === selectedValue);

    const inputProps = {
        onBlur: useForkHandler(onBlur, close),
        disabled,
        ...rest,
    };

    const handleSelect = (val) => {
        setSelectedValue(val);
        onChange?.(val);
        close();
    };

    const overlay = (
        <Scroller maxHeight={256}>
            {options.map((opt) => (
                <Option
                    key={opt.value}
                    onClick={() => handleSelect(opt.value)}
                    selected={selectedOption?.value === opt.value}
                >
                    {opt.children ?? opt.label}
                </Option>
            ))}
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
        onOpen: PropTypes.func,
        onClose: PropTypes.func,
        disabled: PropTypes.bool,
        className: PropTypes.string,
    };
}

Select.defaultProps = {
    options: [],
};
